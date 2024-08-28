const { PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const s3Client = require('../config/awsS3.js'); // Ajuste o caminho conforme necessário

const uploadProfilePicFile = async (fileContent, fileName, mimeType) => {
    const params = {
        Bucket: 'cliente-feliz',
        Key: `logos/${fileName}`,
        Body: fileContent,
        ContentType: mimeType
    };

    try {
        const command = new PutObjectCommand(params);
        await s3Client.send(command);  // Envio do comando para o S3

        // Gere a URL pública após o upload bem-sucedido
        const url = `https://${params.Bucket}.s3.amazonaws.com/${params.Key}`;

        return {
            URL: url,  // Retorna a URL do arquivo
        };
    } catch (err) {
        console.error("Error uploading file: ", err);
        throw err;
    }
};

const deleteFile = async (key) => {
    const params = {
        Bucket: 'cliente-feliz',
        Key: `${key}`
    };

    try {
        const command = new DeleteObjectCommand(params);
        const response = await s3Client.send(command);
        return response;
    } catch (err) {
        console.error("Error deleting file: ", err);
        throw err;
    }
};

module.exports = {
    uploadProfilePicFile,
    deleteFile
};
