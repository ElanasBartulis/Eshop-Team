import { Cart, CartItem, Product } from '../models/indexModel.js';

// Get cart
export async function getCart(req, res) {
  try {
    const sessionId = req.session.id;
    const userId = req.session.user?.id || null;

    let cart = await Cart.findOne({
      where: userId ? { userId } : { sessionId },
      include: [
        {
          model: CartItem,
          as: 'CartItems',
          include: [
            {
              model: Product,
              as: 'Product',
              attributes: ['id', 'name', 'price', 'image', 'discount'],
            },
          ],
        },
      ],
    });

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({
      error: 'Failed to retrieve cart',
      details: error.message,
    });
  }
}

export async function addToCart(req, res) {
  try {
    const sessionId = req.session.id;
    const { productId, quantity = 1 } = req.body;
    const userId = req.session.user?.id || null;

    let cart = await Cart.findOne({
      where: userId ? { userId } : { sessionId },
    });

    if (!cart) {
      cart = await Cart.create({
        sessionId,
        userId,
      });
    }

    let cartItem = await CartItem.findOne({
      where: {
        cartId: cart.id,
        productId: productId,
      },
    });

    if (cartItem) {
      cartItem.quantity += parseInt(quantity);
      await cartItem.save();
    } else {
      cartItem = await CartItem.create({
        cartId: cart.id,
        productId: productId,
        quantity: quantity,
      });
    }

    const updatedCartItem = await CartItem.findOne({
      where: { id: cartItem.id },
      include: [
        {
          model: Product,
          as: 'Product',
          attributes: ['id', 'name', 'price', 'image'],
        },
      ],
    });

    res.json(updatedCartItem);
  } catch (error) {
    console.error('Error in POST /cart/add:', error);
    res.status(500).json({ error: error.message });
  }
}

export async function updateCart(req, res) {
  try {
    const { productId, quantity } = req.body;
    const sessionId = req.session.id;
    const userId = req.session.user?.id || null;

    if (!quantity || quantity < 1) {
      return res.status(400).json({ error: 'Quantity must be at least 1' });
    }

    const cart = await Cart.findOne({
      where: userId ? { userId } : { sessionId },
    });
    if (!cart) return res.status(404).json({ error: 'Cart not found' });

    const cartItem = await CartItem.findOne({
      where: { cartId: cart.id, productId },
    });

    if (!cartItem)
      return res.status(404).json({ error: 'Item not found in cart' });

    cartItem.quantity = quantity;
    await cartItem.save();

    res.json(cartItem);
  } catch (error) {
    console.error('Error in PUT /cart/update:', error);
    res.status(500).json({ error: 'Failed to update item quantity' });
  }
}

export async function deleteCartItem(req, res) {
  try {
    const { productId } = req.body;
    const sessionId = req.session.id;
    const userId = req.session.user?.id || null;

    const cart = await Cart.findOne({
      where: userId ? { userId } : { sessionId },
    });
    if (!cart) return res.status(404).json({ error: 'Cart not found' });

    const deleted = await CartItem.destroy({
      where: { cartId: cart.id, productId },
    });

    if (deleted) {
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'Item not found in cart' });
    }
  } catch (error) {
    console.error('Error in DELETE /cart/remove:', error);
    res.status(500).json({ error: 'Failed to remove item from cart' });
  }
}

export async function removeAllItems(req, res) {
  try {
    const sessionId = req.session.id;
    const userId = req.session.user?.id || null;

    // Find the cart using either userId or sessionId
    const cart = await Cart.findOne({
      where: userId ? { userId } : { sessionId },
    });

    if (cart) {
      // Delete all items in this cart
      await CartItem.destroy({
        where: { cartId: cart.id },
      });
      res.status(200).json({ message: 'Cart cleared successfully' });
    } else {
      res.status(404).json({ message: 'Cart not found' });
    }
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({ message: 'Failed to clear cart' });
  }
}
