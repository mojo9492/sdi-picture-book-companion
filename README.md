# sdi-picture-book-companion

## Problem Statement
Develop a web based application to address the problem of determining a maintenance part to be purchased using user uploaded images and associate with the appropriate manufacturer part numbers and/or national stock number (NSN)

## Contents

## Description
The App is designed to grow based on user entries. It becomes more customed tailored to the team's application through usage and provides continuity to successive members. By adopting the image-first ideology, this app allows quick part acquisition and elliminates errors by adding more context to parts.

## Installation
- Make sure Docker is installed and and that the latest pg-docker is pulled from [Docker hub](https://hub.docker.com/_/postgres)
- To install the backend, run `yarn install` in your cli inside the project directory
- To install the frontend, change into the client/ directory and run `yarn install`

## Usage
- Search by part category, common name, nomenclature, National Stock Number (NSN), and part number
- If no results, add a new item by navigating to add item and implementing all informaiton: an image must be included as well as all other field in order to improve the database
