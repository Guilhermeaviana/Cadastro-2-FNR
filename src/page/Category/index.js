import React, { useEffect, useState } from "react";
// Adicione Container à importação
import { Card, Button, Form, Table, Container } from "react-bootstrap";
import api from "../../services/api";
import "./styles.css";

export default function Category() {
  // ... (todo o seu código de state e funções continua igual) ...
  const [categories, setCategories] = useState([]);

  const initialState = {
    id: null,
    name: "",
    description: "",
  };
  const [data, setData] = useState(initialState);

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    try {
      const response = await api.get("/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Erro ao carregar categorias:", error);
      alert("Erro ao carregar categorias. Verifique se o servidor está rodando.");
    }
  }

  async function deleteCategory(id) {
    try {
      const response = await api.get(`/products?categoryId=${id}`);
      if (response.data.length > 0) {
        alert("Não é possível excluir esta categoria, pois existem produtos associados a ela.");
        return;
      }

      if (window.confirm("Tem certeza que deseja excluir esta categoria?")) {
        await api.delete(`/categories/${id}`);
        alert("Categoria excluída com sucesso!");
        await loadCategories();
      }
    } catch (error) {
      console.error("Erro ao deletar categoria:", error);
      alert("Erro ao deletar categoria");
    }
  }

  function editCategory(id) {
    try {
      const category = categories.find((category) => category.id === id);
      if (category) {
        setData(category);
        window.scrollTo(0, 0);
      }
    } catch (error) {
      console.error("Erro ao carregar dados da categoria:", error);
      alert("Erro ao carregar dados da categoria");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!data.name || data.name.trim() === "") {
        alert("O nome da categoria é obrigatório.");
        return;
    }

    const isDuplicate = categories.some(
      (category) => category.name.toLowerCase() === data.name.toLowerCase() && category.id !== data.id
    );

    if (isDuplicate) {
      alert("Já existe uma categoria com este nome.");
      return;
    }

    const postData = {
      name: data.name,
      description: data.description,
    };

    try {
      if (data.id) {
        await api.put(`/categories/${data.id}`, postData);
        alert("Categoria atualizada com sucesso!");
      } else {
        await api.post("/categories", postData);
        alert("Categoria cadastrada com sucesso!");
      }
      setData(initialState);
      await loadCategories();
    } catch (error) {
      console.error("Erro ao salvar categoria:", error);
      alert("Erro ao salvar categoria");
    }
  }

  return (
    // Envolva tudo com o <Container>
    <Container>
      <Form onSubmit={handleSubmit}>
        {/* ... (o resto do seu JSX continua igual) ... */}
        <Card className="marg-botton">
          <Card.Header as="h5">CADASTRAR CATEGORIAS</Card.Header>
          <Card.Body>
            <Form.Row>
              <Form.Group className="col-md-6">
                <Form.Label>Nome*</Form.Label>
                <Form.Control
                  name="name"
                  onChange={(e) => {
                    setData({ ...data, name: e.target.value });
                  }}
                  value={data.name}
                  placeholder="Informe o nome da categoria"
                  required
                />
              </Form.Group>
              <Form.Group className="col-md-6">
                <Form.Label>Descrição</Form.Label>
                <Form.Control
                  name="description"
                  onChange={(e) => {
                    setData({ ...data, description: e.target.value });
                  }}
                  value={data.description}
                  placeholder="Informe a descrição da categoria"
                />
              </Form.Group>
            </Form.Row>
            <Button type="submit" variant="primary">
              {data.id ? "ATUALIZAR" : "SALVAR"}
            </Button>
            {data.id && (
                <Button variant="secondary" onClick={() => setData(initialState)} className="ml-2">
                    CANCELAR EDIÇÃO
                </Button>
            )}
          </Card.Body>
        </Card>
      </Form>
      <Card>
        <Card.Header as="h5">LISTA DE CATEGORIAS</Card.Header>
        <Card.Body>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Descrição</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id}>
                  <td>{category.id}</td>
                  <td>{category.name}</td>
                  <td>{category.description}</td>
                  <td>
                    <span className="just-icon">
                      <Button variant="link" onClick={() => editCategory(category.id)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-pencil"
                          viewBox="0 0 16 16"
                        >
                          <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                        </svg>
                      </Button>
                      <Button variant="link" onClick={() => deleteCategory(category.id)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-trash"
                          viewBox="0 0 16 16"
                        >
                          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                          <path
                            fillRule="evenodd"
                            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                          />
                        </svg>
                      </Button>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
}