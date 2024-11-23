import "dotenv/config";
import conectarAoBanco from "../config/dbConfig.js";
import { ObjectId } from "mongodb"; // Certifique-se de importar o ObjectId corretamente

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

export async function getTodosPosts() {
	const db = conexao.db("Imersao-alura");
	const colecao = db.collection("posts");
	return colecao.find().toArray();
}

export async function buscarpost(id) {
	const db = conexao.db("Imersao-alura");
	const colecao = db.collection("posts");
	try {
		// Converte o id para ObjectId
		const objectId = new ObjectId(id);
		return colecao.findOne({ _id: objectId });
	} catch (error) {
		// Caso o id não seja válido
		console.error("Erro ao converter o ID:", error.message);
		return null;
	}
}

export async function criarPost(novoPost) {
	const db = conexao.db("Imersao-alura");
	const colecao = db.collection("posts");
	return colecao.insertOne(novoPost);
}

export async function atualizarPost(id, novoPost) {
	const objID = ObjectId.createFromHexString(id);
	const db = conexao.db("Imersao-alura");
	const colecao = db.collection("posts");
	return colecao.updateOne({ _id: new ObjectId(objID) }, { $set: novoPost });
}
