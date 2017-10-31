#!/bin/bash -e

quality_gem_version=$(cat .quality-gem-version)

docker run  \
       -v "$(pwd):/usr/app"  \
       -v "$(pwd)/Rakefile.quality:/usr/quality/Rakefile"  \
       "apiology/quality:${quality_gem_version}"
