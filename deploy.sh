#!/bin/bash
npx eleventy && rsync -avz --delete _site/ root@$(hcloud server ip websites):/var/www/printer.tools
