const UserProfileTable = ({ userData }) => {
  const { balance, address } = userData;

  return (
    <table>
      <thead>
        <tr>
          <th>Field</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Balance</td>
          <td>{balance} eth</td>
        </tr>
        <tr>
          <td>Address</td>
          <td>{address}</td>
        </tr>
        
      </tbody>
    </table>
  );
};

export default UserProfileTable;