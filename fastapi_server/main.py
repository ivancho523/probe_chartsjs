from fastapi import FastAPI
from fastapi import Request #la necesitaremos para generar una instancia de la petición y es obligatoria cada vez que retornamos una plantilla de Jinja2
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse #porque en nuestro endpoint necesitaremos indicar que la respuesta será de tipo HTML
from fastapi.staticfiles import StaticFiles #para realizar la configuración de almacenamiento y ruta de los archivos estáticos ya sean css, javascript, imágenes o lo que queramos.
from fastapi.templating import Jinja2Templates #para poder utilizar las plantillas de Jinja2.
import requests
import json

app = FastAPI()

#estos son algunos ajustes para personalizar la aplicación
app.title = "Datos al CHARTJS"
app.description = "Esto es una API para probar funcionamiento"
app.version = "0.0.1"
app.contact = {
    "name": "zerox523",
    "url": "https://www.proximamente.com",
    "email": "larata@gmail.com"
    }
app.license_info = {
    "name": "Apache 2.0",
    "url": "https://www.apache.org/licenses/LICENSE-2.0.html"
}

#estos son los puntos de acceso permitidos a nuestra app
origins = [
    "http://localhost",
    "http://localhost:5500",
    "http://127.0.0.1:5500"
]

#este método me permite acceder a los datos de mi app desde otra app
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# @app.get('/')
# async def prueba():
#     return {"mensaje": "Hola Mundo"}


@app.get('/', tags=['home'])
async def raiz():
    url_data = "https://pm25.lass-net.org/API-1.0.0/project/lass/latest/"
    data_brute = requests.get(url_data)
    # print(data_brute)
    data = data_brute.json()
    # print(data)
    return data

html_content = "PROBE_CHARTJS/index.html"

@app.get('/chart')
async def dibujo():
    return HTMLResponse(content=html_content, status_code=200)

@app.get('/name/{nombre}', tags=['nombre'])
async def name(nombre: str):
    return HTMLResponse('<h4>Hola {nombre}</h4>')

@app.get('/datos', tags=['home'])
async def datos_prueba():
    url_data = "https://pm25.lass-net.org/data/device_indoor.json"
    data_brute = requests.get(url_data)
    # print(data_brute)
    data = data_brute.json()
    # print(data)
    return data