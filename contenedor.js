import fs from 'fs';

export default class Contenedor {
    constructor(ruta) {
        this.ruta = ruta;
    }

    async save(obj) {
        const arrObj = await this.getAll();
        if (arrObj === undefined || arrObj.length === 0) {
            obj.id = 1; 
        } else {
            obj.id = arrObj[arrObj.length - 1].id + 1;
        }
        arrObj.push(obj);
        this.saveInFile(arrObj);
        return obj.id;
    }

    async getById(id) {
        const arrObj = await this.getAll();
        return arrObj.find(o=>o.id == id) || null;
    }

    async getAll() {
        try {
            const arrObj = await fs.promises.readFile(this.ruta, 'utf-8');
            return JSON.parse(arrObj);
        } catch (error) {
            console.log('Error al leer el archivo. ' + error);
        }
    }

    async deleteById(id) {
        const arrObj = await this.getAll();
        const newArrObj = arrObj.filter(o=>o.id !== id);
        this.saveInFile(newArrObj);
    }

    async deleteAll() {
        try {
            await fs.promises.writeFile(this.ruta, "[]");
        } catch (error) {
            console.log('Error al borrar el archivo. ' + error);
        }
    }

    async saveInFile(arrObj) {
        try {
            await fs.promises.writeFile(this.ruta, JSON.stringify(arrObj));
        } catch (error) {
            console.log('Error al escribir el archivo. ' + error);
        }
    }

}