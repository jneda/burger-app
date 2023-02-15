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
    <article className="centered" onClick={() => props.onClick(id)}>
      <img src={imagePath} alt={name}></img>
      <h2>{name}</h2>
      <span>{price / 100} €</span>
    </article>
  );
}

function Counter(props) {
  return (
    <div className="counter centered">
      <button onClick={props.onRemoveProduct}>-</button>
      <span>{props.quantity}</span>
      <button onClick={props.onAddProduct}>+</button>
    </div>
  );
}

function Menu(props) {
  const menuItems = props.products.map((product, index) => (
    <li key={product.id} index={index}>
      <Product
        details={product}
        onClick={() => props.onAddProduct(product.id)}
      />
    </li>
  ));

  return (
    <div className="menu">
      <ul className="productList">{menuItems}</ul>
    </div>
  );
}

function Cart(props) {
  const orderedItemsData = props.orderedItems || [];
  const orderedItems = orderedItemsData.map((orderedItem) => (
    <li key={orderedItem.id} className="cartItem">
      <Product details={orderedItem} />
      <Counter
        quantity={orderedItem.quantity}
        onAddProduct={() => props.onAddProduct(orderedItem.id)}
        onRemoveProduct={() => props.onRemoveProduct(orderedItem.id)}
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
    console.table(this.state);
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
    return (
      <React.Fragment>
        <h1>🍔 Burger App ! 🍟</h1>
        <main>
          <Menu
            products={this.props.products}
            onAddProduct={(id) => this.handleAddProduct(id)}
          />
          <Cart
            orderedItems={this.state.orderedItems}
            onAddProduct={(id) => this.handleAddProduct(id)}
            onRemoveProduct={(id) => this.handleRemoveProduct(id)}
            totalPrice={this.state.totalPrice}
          />
        </main>
      </React.Fragment>
    );
  }
}

const root = ReactDOM.createRoot(document.querySelector("#app"));
root.render(<App products={products} />);
