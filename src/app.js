const products = [
  {
    id: 1,
    name: "Burger Kid",
    price: 5.95,
  },
  {
    id: 2,
    name: "Artery Clogger",
    price: 12.95,
  },
  {
    id: 3,
    name: "Rabbit's Veggie",
    price: 8.95,
  },
];

function Product({ details: { name, price } }) {
  return (
    <article>
      <h2>{name}</h2>
      <span>{price} €</span>
    </article>
  );
}

function Menu(props) {
  const menuItems = props.products.map((product, index) => (
    <li key={product.id} index={index}>
      <Product details={product} />
    </li>
  ));

  return <ul className="menu">{menuItems}</ul>;
}

function Order(props) {
  const orderedItemsData = props.orderedItems || [];
  const orderedItems = orderedItemsData.map((orderedItem) => (
    <li key={orderedItem.id}>
      <Product details={orderedItem} />
      <span>{orderedItem.quantity}</span>
    </li>
  ));

  return <ul className="order">{orderedItems}</ul>;
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.products = props.products;
    this.state = {
      orderedItems: [{ ...this.products[1], quantity: 2 }],
    };
    console.table(this.state.orderedItems);
  }

  orderItem = (e) => {
    console.log(e.target);
  };

  render() {
    return (
      <React.Fragment>
        <h1>Burger App !</h1>
        <main>
          <Menu products={this.props.products} />
          <Order orderedItems={this.state.orderedItems} />
        </main>
      </React.Fragment>
    );
  }
}

const root = ReactDOM.createRoot(document.querySelector("#app"));
root.render(<App products={products} />);
