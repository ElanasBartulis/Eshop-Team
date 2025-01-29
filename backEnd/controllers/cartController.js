import Cart from "../models/cartModel.js";
import CartItem from "../models/cartItemModel.js";
import Product from "../models/productModel.js";

// Get cart
export async function getCart(req, res) {
  try {
    const sessionId = req.session.id;
    const userId = req.user?.id || null;
    let cart = await Cart.findOne({
      where: userId ? { userId } : { sessionId },
      include: [
        {
          model: CartItem,
          include: [Product],
        },
        {
          model: User,
          as: "User",
          attributes: ["id"],
        },
      ],
    });

    if (!cart) {
      cart = await Cart.create({ sessionId, userId });
    }

    cart = await cart.update({ userId: userId }, { where: { id: cart.id } });

    res.json({
      cart,
      userId: req.user?.id,
    });
  } catch (error) {
    console.error("Error in GET /cart:", error);
    res.status(500).json({ error: "Failed to retrieve cart" });
  }
}

// Add to cart
export async function addToCart(req, res) {
  try {
    const sessionId = req.session.id;
    const { productId, quantity = 1 } = req.body;
    const userId = req.user?.id || null; // Changed from req.session.userId

    console.log("Adding item with:", {
      sessionId,
      userId,
      productId,
      quantity,
    });

    // Find or create cart
    let cart = await Cart.findOne({
      where: userId ? { userId } : { sessionId },
    });

    if (!cart) {
      cart = await Cart.create({ sessionId, userId });
      console.log("New cart created:", cart.id);
    }

    console.log("Using cart:", cart.id);

    // Find or create cart item
    const [cartItem, created] = await CartItem.findOrCreate({
      where: {
        cartId: cart.id,
        productId: productId,
      },
      defaults: {
        cartId: cart.id,
        productId: productId,
        quantity: quantity,
      },
    });

    if (!created) {
      await cartItem.save();
    }

    console.log("Cart item:", cartItem);
    res.json(cartItem);
  } catch (error) {
    console.error("Detailed error in POST /cart/add:", error);
    res.status(500).json({ error: error.message });
  }
}

// Update quantity
export async function updateCart(req, res) {
  try {
    const { productId, quantity } = req.body;
    const sessionId = req.session.id;
    const userId = req.user?.id || null;

    const cart = await Cart.findOne({
      where: userId ? { userId } : { sessionId },
    });
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    const cartItem = await CartItem.findOne({
      where: { cartId: cart.id, productId },
    });

    if (!cartItem)
      return res.status(404).json({ error: "Item not found in cart" });

    cartItem.quantity = quantity;
    await cartItem.save();

    res.json(cartItem);
  } catch (error) {
    console.error("Error in PUT /cart/update:", error);
    res.status(500).json({ error: "Failed to update item quantity" });
  }
}

// Remove item
export async function deleteCartItem(req, res) {
  try {
    const { productId } = req.body;
    const sessionId = req.session.id;
    const userId = req.user?.id || null;

    const cart = await Cart.findOne({
      where: userId ? { userId } : { sessionId },
    });
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    const deleted = await CartItem.destroy({
      where: { cartId: cart.id, productId },
    });

    if (deleted) {
      res.json({ success: true });
    } else {
      res.status(404).json({ error: "Item not found in cart" });
    }
  } catch (error) {
    console.error("Error in DELETE /cart/remove:", error);
    res.status(500).json({ error: "Failed to remove item from cart" });
  }
}
