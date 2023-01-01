import './Wallet.scss';

import MyPagination from '@/components/MyPagination/MyPagination/MyPagination';
import MySpinner from '@/components/MySpinner/MySpinner';
import useGetAppUser from '@/hooks/useGetAppUser';
import { IOffer } from '@/models/Offer';
import { faMoneyBillAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Table } from 'react-bootstrap';

import useGetAccountBalance from './hooks/useGetAccountBalance';
import useGetTimeTransactions from './hooks/useGetTimeTransactions';

function Wallet() {
  const { loading, data, handleGetTimeTransactions } = useGetTimeTransactions();
  const { loggedInAppUser } = useGetAppUser();
  const { data: balance, loading: balanceLoading } = useGetAccountBalance();

  const isIncome = (offer: IOffer): boolean => {
    if (loggedInAppUser?.id === offer?.seller?.id) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <section className="wallet-container">
      <MySpinner show={loading || balanceLoading}>
        <div>
          <div className="pb-3">
            <Card className="text-center">
              <Card.Header>
                <FontAwesomeIcon icon={faMoneyBillAlt} /> Account Balance
              </Card.Header>
              <Card.Body>
                <Card.Title>
                  {balance}h{" "}
                  <span>
                    <img
                      className="my-img"
                      width={"70px"}
                      src="../../../src/assets/images/balance-account-image.png"
                    ></img>
                  </span>
                </Card.Title>
              </Card.Body>
            </Card>
          </div>
          {data && (
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
          )}
        </div>
        <MyPagination data={data} handleGetData={handleGetTimeTransactions} />
      </MySpinner>
    </section>
  );
}

export default Wallet;
