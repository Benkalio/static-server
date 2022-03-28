//CLIENT-SIDE DATA FETCHING IMPLEMENTED HERE

import { useEffect, useState } from 'react';
import useSWR from 'swr';

function LastSalesPage(props) {
    const [sales, setSales] = useState(props.sales);
    // const [isLoading, setIsLoading] = useState(false);

    const { data, error } = useSWR(
        'https://nextjs-clientsidedatafetch-default-rtdb.firebaseio.com/sales.json'
    );

    useEffect(() => {
        if (data) {
            const tranformedSales = [];

            for (let key in data) {
                tranformedSales.push({
                    id: key,
                    username: data[key].username,
                    volume: data[key].volume
                })
            }
            setSales(tranformedSales);
        }
    }, [data]);

    // useEffect(() => {
    //     setIsLoading(true);
    //     fetch('https://nextjs-clientsidedatafetch-default-rtdb.firebaseio.com/sales.json')
    //         .then((response) => response.json)
    //         .then((data) => {
    //             const tranformedSales = [];

    //             for (let key in data) {
    //                 tranformedSales.push({
    //                     id: key,
    //                     username: data[key].username,
    //                     volume: data[key].volume
    //                 });
    //             }
    //             setSales(tranformedSales);
    //             setIsLoading()
    //         });
    // }, []);

    if (error) {
        return <p>Failed to load</p>
    }
    
    if (!data && !sales) {
        return <p>Loading...</p>
    }

    return(
        <ul>
            {sales.map((sale) => (
                <li key={sale.id}>
                    {sale.username} - ${sale.volume}
                </li>
            ))}
        </ul>
    );
}

//CLIENT-SIDE DATA FETCHING IMPLEMENTED
export async function getStaticProps() {
    const response = await fetch(
        'https://nextjs-clientsidedatafetch-default-rtdb.firebaseio.com/sales.json'
    );
    
    const data = await response.json();
    
    const tranformedSales = [];

    for (let key in data) {
        tranformedSales.push({
            id: key,
            username: data[key].username,
            volume: data[key].volume
        });
    }
    return { props: { sales: tranformedSales }  };
}

export default LastSalesPage;
