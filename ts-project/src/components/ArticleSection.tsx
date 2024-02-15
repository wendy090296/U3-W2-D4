import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//creo la mia interface

interface ARTICLES {
  events: string;
  featured: boolean;
  id: number;
  image_url: string;
  launches: [];
  news_site: string;
  published_at: string;
  summary: string;
  update_at: string;
  url: string;
}

// setto stato iniziale dell'array che mi fornirà il json
const ArticleSection = () => {
  const [articles, setArticles] = useState<ARTICLES[]>([]); // generic

  const navigate = useNavigate();

  // funzione contenente la fetch da cui otterro' l' array di articoli
  const FetchFunction = async () => {
    try {
      const response = await fetch(
        "https://api.spaceflightnewsapi.net/v4/articles"
      );
      if (response.ok) {
        const arrayOfArticles = await response.json();
        console.log(arrayOfArticles);
        // setto il nuovo stato del mio array
        setArticles(arrayOfArticles.results);
      } else {
        throw new Error("errore nel recupero dei dati");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // eseguo la fetch al montaggio del componente

  useEffect(() => {
    // simulo il componentDidMount,
    //faccio partire la fetch degli articoli richiamando la funzione FetchFunction()
    FetchFunction();
  }, []);

  return (
    <Container fluid>
      <Row>
        <Col>
          <h2 className="text-center mb-5">Articles Section</h2>
        </Col>
      </Row>
      <Row className="g-4">
        {articles.map((article) => (
          <Col xs={12} key={article.id}>
            <Card className="h-100">
              <Row>
                <Col md={4}>
                  <Card.Img
                    variant="top"
                    src={article.image_url}
                    className="img-fluid"
                  />
                </Col>
                <Col md={8}>
                  <Card.Body>
                    <Card.Title>{article.update_at}</Card.Title>
                    <Card.Text>{article.summary}</Card.Text>
                    <Button
                      variant="primary"
                      onClick={() => navigate("/" + article.id)}
                    >
                      Discover more
                    </Button>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};
export default ArticleSection;
