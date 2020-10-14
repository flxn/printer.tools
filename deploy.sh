#!/bin/bash
npx eleventy && rsync -avz --delete _site/ flxn:/var/www/printer.tools
