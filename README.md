#### 1. Install dependencies

- nodejs and npm
- postgresql database
- nginx (optional)


#### 2. Install packages

Run from project root folder: `npm install`


#### 3. Set postgresql environment variables

In project root folder:

- export PGUSER=your_username
- export PGPASSWORD=your_password
- export PGDATABASE=your_database


#### 4. Create table and import data

Run from project root folder: `node_modules/.bin/babel-node ./server/src/fill_database.js`


#### 5. Build or watch javascript files

Run from project root folder:

- create build folder:`mkdir ./frontend/build`
- build: `npm run build`
- or watch: `npm run watch`


#### 6. Compile and start webserver

Run from project root folder: `npm start`

To run the server forever in a server environment choose either of these commands:

- `npm start &`
- `node_modules/.bin/babel-node ./server/src/server.js &`
- `nohup node_modules/.bin/babel-node ./server/src/server.js`
- `node_modules/.bin/babel-node ./server/src/server.js > /dev/null 2>&1 &`


#### 7. Setup nginx (optional)

You can run the client directly by navigating to http://localhost:5002

If you want to run the server publicly, you have to set it up as a proxy behind port 80. Add these lines to your nginx.conf:

```
http{

  ...

  server {
    server_name your.webserver.org;
    location / {
      proxypass http://127.0.0.1:5002
    }
  }
}
```

Because geojson and topojson can be quite large consider enabling gzip compression on nginx, see this [manual](https://davidwalsh.name/enable-gzip).



#### Topojson

In case you wish to create your own fresh topojson file follow these steps:

1. Download municipal boundaries from [Imergis](http://www.imergis.nl/asp/47.asp) or from [CBS](https://www.cbs.nl/nl-nl/dossier/nederland-regionaal/geografische%20data/wijk-en-buurtkaart-2015)
2. Extract the downloaded zip and cd into the extracted folder
3. If you are on Linux install the shape to geojson converter: `sudo apt-get install gdal-bin`
4. Convert shape to geojson: `ogr2ogr -f GeoJSON -t_srs crs:84 output_file.geojson input_file.shp`
5. Install [minify-geojson](https://www.npmjs.com/package/minify-geojson): `npm install --save-dev minify-geojson`
6. Convert geojson to topojson by running this command: `minify-geojson -kit original.geojson` -> this will create a file original.topojson in the same folder as original.geojson is located.

Additionally, you might want to read this [thread](http://stackoverflow.com/questions/2223979/convert-a-shapefile-shp-to-xml-json) on Stackoverflow.




