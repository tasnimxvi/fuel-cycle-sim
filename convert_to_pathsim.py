import pathsim
import json

import numpy as np
import matplotlib.pyplot as plt

from pathsim import Simulation, Connection
from pathsim.blocks import ODE, Source, Scope, Block
from pathsim.solvers import RKBS32, RKF21
from pathsim.events import ZeroCrossingDown, ZeroCrossingUp
from pathsim.blocks.mixed import Pulse 


# CUSTOM BLOCK ==========================================================================

class Process(ODE):
    def __init__(self, alpha=0, betas=[], gen=0, ic=0):
        super().__init__(
            func=lambda x, u, t: alpha * x + sum(_u*_b for _u, _b in zip(u, betas)) + gen, 
            jac=lambda x, u, t: alpha, 
            initial_value=ic
            )

# read json file

data = json.load(open("saved_graphs/test.json"))

blocks = []
for node in data["nodes"]:
    block = Process(
        alpha=-1/node["data"]["residence_time"],
        betas=[....],
        ic=node["data"]["initial_value"],
    )
    blocks.append(block)

connections = []
for edge in data["edges"]:
    ....
    connection.append(...)

my_simulation = Simulation(
    blocks=blocks,
    connections=connections,
    solver=RKBS32(),
    ...
)

my_simulation.save(...)
my_simulation.run()