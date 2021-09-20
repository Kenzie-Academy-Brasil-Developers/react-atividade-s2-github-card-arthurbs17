const Cards = ({ list }) => {
  return (
    <ul>
      {list.map((repo) => (
        <li>{repo.full_name}</li>
      ))}
    </ul>
  );
};

export default Cards;
