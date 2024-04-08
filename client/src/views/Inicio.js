import { Col, Row } from "reactstrap";
import ResumenVentas from "../components/Inicio/ResumenVentas";


const Inicio = () => {
  return (
    <div>

      {/***Sales & Feed***/}

      <Row>
        <Col>
          <ResumenVentas />
        </Col>
      </Row>

      {/* <Row>
        <Col sm="6" lg="6" xl="7" xxl="8">
          <SalesChart />
        </Col>
        <Col sm="6" lg="6" xl="5" xxl="4">
          <Feeds />
        </Col>
      </Row> */}

    </div>
  );
};

export default Inicio;
