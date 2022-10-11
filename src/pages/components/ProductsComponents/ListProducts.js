import React, {useEffect, useState} from 'react';
import {Card, Table} from "@themesberg/react-bootstrap";
import {Box, CircularProgress, Stack} from "@mui/material";
import {Alert, Pagination} from "@mui/lab";
import {products} from "../../../data/products"
import {listSavs} from "../../../actions/savAction";
import ProductRow from "./ProductRow";

const ListProducts = ({search}) => {
    // filter
    const [state, setState] = useState(false);
    const handleState = () => setState(true);



    /****** PAGINATION****/
    const [activePage, setActivePage] = useState(1);
    const handleChange = (event, value) => {
        setActivePage(value);
        console.log(value);
    };

console.log("hehdom products", products)
    return (
        <>
            <Card border="light" className="table-wrapper table-responsive shadow-sm">
                <Card.Body className="pt-0">

                        <>
                            <Table hover className="user-table align-items-center">
                                <thead>
                                <tr>
                                    <th className="border-bottom">ID</th>
                                    <th className="border-bottom">NAME</th>
                                    <th className="border-bottom">Price</th>
                                    <th className="border-bottom">Unit</th>
                                    <th className="border-bottom" >In stock</th>
                                </tr>
                                </thead>

                                <tbody>


                                {products?.filter((row) => {
                                    if (search === "") {
                                        return row;
                                    } else if (
                                        (row.description.toLowerCase().includes(search.toLowerCase()))
                                        || (row.item_code.toLowerCase().includes(search.toLowerCase()))
                                        // || (row.email.toLowerCase().includes(search.toLowerCase()))
                                    ) {
                                        return row;
                                    }
                                }).slice((activePage - 1) * 10, activePage * 10).map((product) => (

                                    <ProductRow product={product} />
                                ))}
                                </tbody>
                            </Table>

                            <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
                                <Stack spacing={2}>


                                    <Pagination
                                        count={Math.trunc(products.length / 10)}
                                        page={activePage}
                                        onChange={handleChange}
                                        color="primary"
                                        variant="outlined" shape="rounded"
                                    />


                                </Stack>
                            </Card.Footer>
                        </>

                </Card.Body>
            </Card>
        </>
    );
};

export default ListProducts;