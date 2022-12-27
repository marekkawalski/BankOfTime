import MySpinner from '@/components/MySpinner/MySpinner';
import { Table } from 'react-bootstrap';

import useGetAppUser from '../../hooks/useGetAppUser';
import { IOffer } from '../../models/Offer';
import useGetTimeTransactions from './hooks/useGetTimeTransactions';

function Wallet() {
  const { loading, data } = useGetTimeTransactions();
  const { loggedInAppUser } = useGetAppUser();

  const isIncome = (offer: IOffer): boolean => {
    if (loggedInAppUser?.id === offer?.seller?.id) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <section className="my-container">
      <MySpinner show={loading || !data || !loggedInAppUser}>
        <Table striped>
          <thead>
            <tr>
              <th>#</th>
              <th>Date</th>
              <th>Status</th>
              <th>Offer</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data?.content.map((transaction) => {
              return (
                <tr key={transaction.id}>
                  <td>{transaction.id}</td>
                  <td>{transaction.transactionDate}</td>
                  <td>{transaction.transactionStatus}</td>
                  <td>{transaction.offer.title}</td>
                  <td>{transaction.offer.price}</td>
                  <td>
                    {isIncome(transaction.offer) ? (
                      <span>+</span>
                    ) : (
                      <span>-</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </MySpinner>
    </section>
  );
}

export default Wallet;
