#!/bin/bash
yarn build && rsync -avz --delete dist/ root@$(hcloud server ip websites):/var/www/printer.tools
