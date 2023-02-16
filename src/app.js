const products = [
  {
    id: 1,
    name: "Burger Kid",
    price: 595,
    image: "kid.jpg",
  },
  {
    id: 2,
    name: "Artery Clogger",
    price: 1295,
    image: "clogger.jpg",
  },
  {
    id: 3,
    name: "Rabbit's Veggie",
    price: 895,
    image: "veggie.jpg",
  },
];

function Product(props) {
  const { id, name, price, image } = props.details;
  const imagePath = "public/assets/" + image;
  return (
    <article onClick={props.handleAddProduct ? props.handleAddProduct : undefined}>
      <img src={imagePath} alt={name}></img>
      <h2>{name}</h2>
      <span>{price / 100} €</span>
    </article>
  );
}

function Counter(props) {
  return (
    <div className="counter centered">
      <button onClick={props.handleRemoveProduct}>-</button>
      <span>{props.quantity}</span>
      <button onClick={props.handleAddProduct}>+</button>
    </div>
  );
}

function Menu(props) {
  const menuItems = props.products.map((product, index) => (
    <li key={product.id} index={index}>
      <Product
        details={product}
        handleAddProduct={() => props.handleAddProduct(product.id)}
      />
    </li>
  ));

  return (
    <div className="menu">
      <ul className="productList centered">{menuItems}</ul>
    </div>
  );
}

function Cart(props) {
  const orderedItemsData = props.orderedItems || [];
  const orderedItems = orderedItemsData.map((orderedItem) => (
    <li className="cartItem centered" key={orderedItem.id}>
      <Product details={orderedItem} />
      <Counter
        quantity={orderedItem.quantity}
        handleAddProduct={() => props.handleAddProduct(orderedItem.id)}
        handleRemoveProduct={() => props.handleRemoveProduct(orderedItem.id)}
      />
    </li>
  ));

  const totalPrice = props.totalPrice / 100;

  return (
    <div className="cart">
      <ul className="productList">{orderedItems}</ul>
      {totalPrice > 0 && (
        <span className="totalPrice centered">
          Total : {totalPrice.toFixed(2)} €
        </span>
      )}
    </div>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.products = props.products;
    this.state = {
      orderedItems: [],
      totalPrice: 0,
    };
  }

  handleAddProduct = (id) => {
    const addedProduct = this.products.find((product) => product.id === id);

    // check if product has already been added
    const orderedItems = [...this.state.orderedItems];
    const productIndex = orderedItems.findIndex(
      (product) => product.id === addedProduct.id
    );
    // if not, add it
    if (productIndex === -1) {
      orderedItems.push({ ...addedProduct, quantity: 1 });
    } else {
      // else add 1 unit
      orderedItems[productIndex].quantity++;
    }

    this.setState({
      orderedItems: orderedItems,
      totalPrice: this.getTotalPrice(orderedItems),
    });
  };

  handleRemoveProduct = (id) => {
    // find product
    let orderedItems = [...this.state.orderedItems];
    const removedProduct = orderedItems.find((product) => product.id === id);
    // decrease quantity by 1
    removedProduct.quantity--;
    // if quantity is 0, remove product from list
    if (removedProduct.quantity <= 0) {
      orderedItems = orderedItems.filter((product) => product.id !== id);
    }

    this.setState({
      orderedItems: orderedItems,
      totalPrice: this.getTotalPrice(orderedItems),
    });
    console.table(this.state);
  };

  getTotalPrice(items) {
    return items.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0
    );
  }

  render() {
    console.table(this.state);

    return (
      <React.Fragment>
        <h1>🍔 Burger App ! 🍟</h1>
        <main>
          <Menu
            products={this.props.products}
            handleAddProduct={(id) => this.handleAddProduct(id)}
          />
          <Cart
            orderedItems={this.state.orderedItems}
            handleAddProduct={(id) => this.handleAddProduct(id)}
            handleRemoveProduct={(id) => this.handleRemoveProduct(id)}
            totalPrice={this.state.totalPrice}
          />
        </main>
      </React.Fragment>
    );
  }
}

const root = ReactDOM.createRoot(document.querySelector("#app"));
root.render(<App products={products} />);
