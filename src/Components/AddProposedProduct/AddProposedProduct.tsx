import React, { useState, useEffect, useMemo } from "react";
import "./addproposed.css";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { STRINGS } from "../../constants/Strings";
import InputBox from "../InputBox/InputBox";
import LoanType from "../config/data.json";
const AddProposedProduct = () => {
  const [topping, setTopping] = useState("First");
  const [checked, setChecked] = useState<any>([]);
  const [percentage, setPercentage] = useState("");
  const [perValue, setValue] = useState<any>({ percentage: "" });
  const [temp, setTemp] = useState(false);
  const [TableArray, SetTableArray] = useState<any>([]);
  const [product, SetProduct] = useState<any>([]);
  const [flag, setFlag] = useState(false);

  //check handler
  const handleCheckAllChange = (e: any) => {
    setChecked(
      e.target.checked ? product.map((c: any) => c.category_name) : []
    );
  };

  //Expected Result
  const FitleredChecked = useMemo(() => {
    if (percentage !== "") {
      const tmp = LoanType.filter((item) =>
        checked.includes(item.category_name)
      );
      let Arr: {
        sub_product_id: number;
        category_name: string;
        percentage: string;
        disabled: boolean;
      }[] = [];
      tmp.map((c) =>
        Arr.push({
          sub_product_id: c.id,
          category_name: c.category_name,
          percentage: percentage ? percentage : perValue?.percentage,
          disabled: true,
        })
      );
      return Arr;
    } else {
      const tmp = product.filter((item: any) =>
        checked.includes(item.category_name)
      );

      let Arr: {
        sub_product_id: number;
        category_name: string;
        percentage: string;
        disabled: boolean;
      }[] = [];
      tmp.map((c: any) =>
        Arr.push({
          sub_product_id: c.id,
          category_name: c.category_name,
          percentage: c?.percentage,
          disabled: c?.disable,
        })
      );
      return Arr;
    }
  }, [checked, percentage, temp]);

  //submit to get table data
  const Submit = (e: any) => {
    e.preventDefault();
    SetTableArray(FitleredChecked);
  };

  // handler for product change
  const HandleProductChange = (e: any, c: any) => {
    setChecked((prevChecked: any[]) =>
      e.target.checked
        ? [...prevChecked, c.category_name]
        : prevChecked.filter((item: any) => item !== c.category_name)
    );
    if (topping === "Second") {
      const updatedProduct = product.map((item: any) =>
        item.category_name === c.category_name
          ? { ...item, disable: !e.target.checked }
          : item
      );
      SetProduct(updatedProduct);
    } else {
      const updatedProduct = product.map((item: any) =>
        item.category_name === c.category_name
          ? { ...item, disable: e.target.checked }
          : item
      );
      SetProduct(updatedProduct);
    }
  };

  //get final product array
  const SetFinalArray = () => {
    if (topping === "First") {
      let arr: {
        percentage: string;
        category_name: string;
        id: number;
        threshold: number;
        disable: boolean;
      }[] = [];
      LoanType.map((ele) => {
        arr.push({
          ...ele,
          percentage: percentage ? percentage : "",
          disable: true,
        });
      });
      SetProduct(arr);
    } else {
      let FinalArr: any[] = [];
      const newArray = product?.map((category: any) => {
        const isMatching = checked.includes(category.category_name);
        if (isMatching) {
          FinalArr.push({
            ...category,
            disable: false,
            percentage: category?.percentage,
          });
        } else {
          FinalArr.push({
            ...category,
            disable: true,
            percentage: "",
          });
        }
      });
      SetProduct(FinalArr);
    }
  };

  //handler to change radio mode
  const handleToppingChange = (event: any) => {
    setTopping(event.target.value);
    setPercentage("");
    setValue({ percentage: "" });
  };

  // handler to set percentage
  const Handler = (event: any) => {
    setPercentage(event.target.value);
    setChecked([]);
  };

  useEffect(() => {
    if (topping !== "Second") {
      setFlag(true);
      setChecked([]);
      setValue("");
    }
    SetFinalArray();
  }, [topping, percentage, temp]);

  //Dynamic input change
  const handleInputChange = (index: any, value: any) => {
    const newArr = [...product];
    newArr[index].percentage = value;
    SetProduct(newArr);
    setTemp((prevTemp) => !prevTemp);
  };
  console.log(FitleredChecked, "FiltereredChecked");
  console.log(TableArray, "tableData");

  return (
    <div>
      <Container className="proposed-form w-100">
        <Form onSubmit={Submit}>
          <Row className="d-flex justify-content-center align-items-center">
            <div className="border border-3 border-primary"></div>
            <h6 className="m-2 ">{STRINGS.Heading}</h6>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <Form.Select aria-label="Default select example">
                    <option>OneAndro Manager</option>
                  </Form.Select>
                  <p className="mt-2 fw-bold nav-link-underline-blue">
                    {STRINGS.LOAN}
                  </p>
                  <div className="radio-group">
                    <input
                      type="radio"
                      name="topping"
                      value="First"
                      onChange={handleToppingChange}
                      id="First"
                      checked={topping === "First"}
                    />
                    <label htmlFor="First" className="ms-2">
                      {" "}
                      Set flag playout % for all sub-products
                    </label>
                  </div>
                  <div className="radio-group">
                    <input
                      type="radio"
                      name="topping"
                      value="Second"
                      onChange={handleToppingChange}
                      id="Second"
                      checked={topping === "Second"}
                    />
                    <label htmlFor="Second" className="ms-2">
                      Set payout % per sub-product
                    </label>
                  </div>
                  <div className="mt-5">
                    {topping === "First" && (
                      <Row>
                        <Col>
                          <h6 className="d-flex justify-content-left">
                            Enter Flat Payout
                          </h6>
                        </Col>
                        <Col>
                          <div>
                            <InputBox Handler={Handler} value={percentage} />
                          </div>
                        </Col>
                      </Row>
                    )}
                  </div>
                  <div className="mt-2">
                    <Row>
                      <Col>
                        <p className="d-flex justify-content-left mt-3 text-muted fw-bold">
                          Sub Product
                        </p>
                      </Col>
                      <Col>
                        <p className="d-flex justify-content-center mt-3 text-muted fw-bold">
                          Payout %
                        </p>
                      </Col>
                    </Row>
                  </div>
                  <div className="form-check form-check-inline d-flex justify-content-left">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="selectAll"
                      checked={checked.length === product.length}
                      onChange={handleCheckAllChange}
                    />
                    <label
                      className="form-check-label ms-5"
                      htmlFor="selectAll"
                    >
                      Select All
                    </label>
                  </div>
                  <>
                    {product.map((c: any, index: any) => (
                      <Row className="mt-3">
                        <Col>
                          <div
                            className="form-check form-check-inline d-flex justify-content-left"
                            key={c?.id}
                          >
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id={c.id}
                              checked={checked.includes(c.category_name)}
                              onChange={(e) => HandleProductChange(e, c)}
                            />
                            <label className="form-check-label ms-5">
                              {c.category_name}
                            </label>
                          </div>
                        </Col>
                        <Col>
                          <InputBox
                            disabled={c?.disable}
                            value={c?.percentage}
                            // Handler={PercentageChange}
                            Handler={(event: any) =>
                              handleInputChange(index, event.target.value)
                            }
                          />
                        </Col>
                      </Row>
                    ))}
                  </>
                </div>
                <div className="mb-2">
                  <Button
                    variant="primary"
                    size="lg"
                    className="rounded-button"
                    type="submit"
                  >
                    Submit
                  </Button>{" "}
                </div>
              </Card.Body>
            </Card>
          </Row>{" "}
        </Form>
      </Container>
    </div>
  );
};

export default AddProposedProduct;
