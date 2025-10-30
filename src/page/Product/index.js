import React, { useEffect, useState } from "react";
// Adicione Container à importação
import { Card, Button, Form, Table, Row, Col, Container } from "react-bootstrap";
import api from "../../services/api";
import "./styles.css";

export default function Product() {
  // ... (todo o seu código de state e funções continua igual) ...
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const initialState = {
    id: null,
    name: "",
    quantity: "",
    value: "",
    categoryId: "",
  };
  const [data, setData] = useState(initialState);

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  async function loadProducts() {
    try {
      const response = await api.get("/products?_expand=category");
      setProducts(response.data);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
      alert("Erro ao carregar produtos. Verifique se o servidor está rodando.");
    }
  }

  async function loadCategories() {
    try {
      const response = await api.get("/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Erro ao carregar categorias:", error);
      alert("Erro ao carregar categorias.");
    }
  }

  async function deleteProduct(id) {
    if (window.confirm("Tem certeza que deseja excluir este produto?")) {
      try {
        await api.delete(`/products/${id}`);
        alert("Produto excluído com sucesso!");
        await loadProducts();
      } catch (error) {
        console.error("Erro ao deletar produto:", error);
        alert("Erro ao deletar produto");
      }
    }
  }

  function editProduct(product) {
    setData(product);
    window.scrollTo(0, 0);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!data.name.trim()) {
      alert("O nome do produto é obrigatório.");
      return;
    }
    if (isNaN(data.quantity) || Number(data.quantity) <= 0 || !Number.isInteger(Number(data.quantity))) {
      alert("A quantidade deve ser um número inteiro positivo.");
      return;
    }
    if (isNaN(data.value) || Number(data.value) <= 0) {
      alert("O valor deve ser um número positivo.");
      return;
    }
    if (!data.categoryId) {
      alert("O produto deve estar associado a uma categoria existente.");
      return;
    }
    const isDuplicate = products.some(
      (product) => product.name.toLowerCase() === data.name.toLowerCase() && product.id !== data.id
    );
    if (isDuplicate) {
      alert("Já existe um produto com este nome.");
      return;
    }

    const postData = {
      name: data.name,
      quantity: Number(data.quantity),
      value: Number(data.value),
      categoryId: Number(data.categoryId),
    };

    try {
      if (data.id) {
        await api.put(`/products/${data.id}`, postData);
        alert("Produto atualizado com sucesso!");
      } else {
        await api.post("/products", postData);
        alert("Produto cadastrado com sucesso!");
      }
      setData(initialState);
      await loadProducts();
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
      alert("Erro ao salvar produto");
    }
  }

  const displayedProducts = products
    .filter(product => 
      !selectedCategory || product.categoryId === Number(selectedCategory)
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    // Envolva tudo com o <Container>
    <Container>
      <Form onSubmit={handleSubmit}>
        {/* ... (o resto do seu JSX continua igual) ... */}
        <Card className="marg-botton">
          <Card.Header as="h5">CADASTRAR PRODUTOS</Card.Header>
          <Card.Body>
            <Form.Row>
              <Form.Group className="col-md-12">
                <Form.Label>Nome*</Form.Label>
                <Form.Control
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  placeholder="Informe o nome do produto"
                  required
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group className="col-md-4">
                <Form.Label>Quantidade*</Form.Label>
                <Form.Control
                  type="number"
                  value={data.quantity}
                  onChange={(e) => setData({ ...data, quantity: e.target.value })}
                  placeholder="Ex: 10"
                  required
                />
              </Form.Group>
              <Form.Group className="col-md-4">
                <Form.Label>Valor*</Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  value={data.value}
                  onChange={(e) => setData({ ...data, value: e.target.value })}
                  placeholder="Ex: 25.99"
                  required
                />
              </Form.Group>
              <Form.Group className="col-md-4">
                <Form.Label>Categoria*</Form.Label>
                <Form.Control
                  as="select"
                  value={data.categoryId}
                  onChange={(e) => setData({ ...data, categoryId: e.target.value })}
                  required
                >
                  <option value="">Selecione uma categoria</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </Form.Control>
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
        <Card.Header as="h5">LISTA DE PRODUTOS</Card.Header>
        <Card.Body>
          <Form.Group as={Row}>
            <Form.Label column sm="3" md="2">Filtrar por Categoria:</Form.Label>
            <Col sm="9" md="4">
              <Form.Control
                as="select"
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
              >
                <option value="">Todas as Categorias</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Form.Control>
            </Col>
          </Form.Group>

          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Qtd</th>
                <th>Valor</th>
                <th>Categoria</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              {displayedProducts.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.quantity}</td>
                  <td>R$ {Number(product.value).toFixed(2)}</td>
                  <td>{product.category?.name || "Sem categoria"}</td>
                  <td>
                    <span className="just-icon">
                      <Button variant="link" onClick={() => editProduct(product)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                          <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                        </svg>
                      </Button>
                      <Button variant="link" onClick={() => deleteProduct(product.id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                          <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
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