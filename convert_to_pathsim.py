import pathsim
import json

import numpy as np
import matplotlib.pyplot as plt

from pathsim import Simulation, Connection
from pathsim.blocks import ODE, Source, Scope, Block, Pulse
from pathsim.solvers import RKBS32, RKF21
from pathsim.events import ZeroCrossingDown, ZeroCrossingUp


# CUSTOM BLOCK ==========================================================================


class Process(ODE):
    def __init__(self, alpha=0, betas=[], gen=0, ic=0):
        super().__init__(
            func=lambda x, u, t: alpha * x
            + sum(_u * _b for _u, _b in zip(u, betas))
            + gen,
            jac=lambda x, u, t: alpha,
            initial_value=ic,
        )


# read json file

data = json.load(open("saved_graphs/test.json"))


def find_node_by_id(node_id):
    for node in data["nodes"]:
        if node["id"] == node_id:
            return node
    return None


def find_block_by_id(block_id):
    for block in blocks:
        if block.id == block_id:
            return block
    return None


connections = {}
blocks = []
for node in data["nodes"]:
    print(f"Processing node {node['id']}")
    connections[node["id"]] = []
    betas = []

    # Find all the edges connected to this node

    for edge in data["edges"]:
        f = 1  # default value for f
        if edge["target"] == node["id"]:
            print(f"Found {edge["source"]} is connected to this node")
            source_node = find_node_by_id(edge["source"])
            betas.append(f / float(source_node["data"]["residence_time"]))

            connections[edge["source"]].append(edge["target"])
    if node["data"]["residence_time"] != "":
        alpha = -1 / float(node["data"]["residence_time"])
    else:
        alpha = 0

    block = Process(
        alpha=alpha,
        betas=betas,
        ic=node["data"]["initial_value"],
        gen=node["data"]["source_term"],
    )
    block.id = node["id"]
    block.label = node["data"]["label"]
    blocks.append(block)

scope = Scope(
    labels=[node["data"]["label"] for node in data["nodes"]],
)
scope.id = "scope"
blocks.append(scope)

next_outputs = {block.id: 0 for block in blocks}

connections_pathsim = []
for source, targets in connections.items():
    source_block = find_block_by_id(source)
    for target in targets:
        target_block = find_block_by_id(target)
        connection = Connection(
            source_block, target_block[next_outputs[target_block.id]]
        )
        print(f"Connecting {source_block.id} to {target_block.id}")
        connections_pathsim.append(connection)
        next_outputs[target_block.id] += 1

# add connections to scope
for block in blocks:
    if block.id != "scope":
        connection = Connection(block, scope[next_outputs[scope.id]])
        connections_pathsim.append(connection)
        next_outputs[scope.id] += 1

my_simulation = Simulation(blocks, connections_pathsim, log=False)


if __name__ == "__main__":

    my_simulation.run(50)

    my_simulation.save("simple.mdl")

    fig, ax = scope.plot()

    plt.show()
