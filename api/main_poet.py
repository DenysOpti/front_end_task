#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""

@author: denys.volkov
"""


import os
import glob
from openai import OpenAI

from dotenv import load_dotenv

load_dotenv()

# %% Support functions

OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY")

client = OpenAI()

role = "You are an assistant that always answers with rhyme."

messages = [{"role": "system", "content": role}]


def poet_chat(content: str):
    messages.append({"role": "user", "content": content})
    response = (
        client.chat.completions.create(
            model="gpt-3.5-turbo", messages=messages, temperature=1.0
        )
        .choices[0]
        .message.content
    )

    messages.append({"role": "assistant", "content": response})
    return response


# %% Support functions

# env_file = glob.glob('*.env')


# with open(env_file[0]) as f:
#     for line in f:
#         if line.strip() and not line.startswith('#'):
#             key, value = line.strip().split('=', 1)
#             os.environ[key] = value

# %% General setting

# %% Chat loop

# while True:

#     # Get user input from the terminal

#     prompt = input("User: ")

#     # Append user message to inputs

#     messages.append({"role": "user", "content": prompt})

#     # Get model response

#     response = client.chat.completions.create(
#       model="gpt-3.5-turbo",
#       messages=messages,
#       temperature=1.0).choices[0].message.content

#     # Append model response to messages

#     messages.append({"role": "assistant", "content": response})

#     # Print model response

#     print(f"GrumpyAI: {response}\n")
