1. Download municipal boundaries from http://www.imergis.nl/asp/47.asp
2. Read this article: http://www.imergis.nl/asp/47.asp
3. If you are on Linux install the shape to geojson converter: `sudo apt-get install gdal-bin`
4. Convert shape to geojson: ogr2ogr -f GeoJSON -t_srs crs:84 [name].geojson [name].shp


or download from: https://www.cbs.nl/nl-nl/dossier/nederland-regionaal/geografische%20data/wijk-en-buurtkaart-2015





https://www.npmjs.com/package/minify-geojson
