import {GoogleGenerativeAI} from "@google/generative-ai";

const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const modelo = genAi.getGenerativeModel({model: "gemini-2.0-flash"});

export const generarDescripcion = async (nombre) => {
    try {
        const promt = `Genera una descripción comercial para un producto de ecommerce:
    - Nombre: ${nombre}
    - Longitud: 2-3 oraciones
    - Estilo: profesional y persuasivo`;

    const resultado = await modelo.generateContent(promt);
    const response = await resultado.response;
    return response.text()
    } catch (error) {
        console.error("Error en generar la descripcion:", error)
        return "Descripcion no disponible"
    }
};

export const generarPrecio = async (nombre) => {
    try{
    const prompt = `Genera un precio competitivo en dolares para:
    - Articulo: ${nombre}
    Respuesta debe ser solo el número sin texto adicional y ponle el signo del dolar. Ejemplo: "$29.99"`;

    const resultado = await modelo.generateContent(prompt);
    const response = await resultado.response;
    return parseFloat(response.text().replace(/[^\d.]/g, ''))

    }catch (error){
        console.error("Error en generar el precio:", error)
        return "Precio no disponible"
    }
};

export const recomendarArticulos = async (categoria) => {
    try {
        const prompt = `Recomiendame 5 productos sobre esta categoria ${categoria}.
        Los productos se deben ver asi:
        - Producto 1,
        - Producto 2,
        - Producto 3,
        - Producto 4,
        - Producto 5.
        
        Nota: Solo los nombres de los articulos`
        const resultado = await modelo.generateContent(prompt)
        const response = await resultado.response
        return response.text()

    } catch (error) {
        console.error("Error en generar las recomendaciones:", error)
        return "Recomendacion no disponible"
    }
}