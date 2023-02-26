import Order from "../models/OrderModel.js";
import Product from "../models/ProductModel.js";

// Get User orders
export const getOneOrder = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    if (!orders) return res.status(404).json("Orders not found!");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
};

// GET ORDER BY ID
export const getOrder = async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id });
    if (!order) return res.status(404).json("Orders not found!");
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json(error);
  }
};

// GET SUCCESS TRANSACTION
export const successOrders = async (req, res) => {
  try {
    const orders = await Order.find({ status: "Success" });
    if (!orders) return res.status(404).json("Orders not found!");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
};
// GET NOTIFICATION ORDER
export const notificationOrders = async (req, res) => {
  try {
    const orders = await Order.find({ status: "Pending" });
    if (!orders) return res.status(404).json("Orders not found!");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateOrder = async (req, res) => {
  try {
    const data = req.body;
    const order = await Order.findOneAndUpdate({ _id: req.params.id }, data);
    if (!order) return res.status(404).json("Orders not found!");
    if (order.products.length !== 0) {
      const updatedOrder = await Order.findOne({ _id: req.params.id });
      if (updatedOrder.status === "Success") {
        for (let i = 0; i < order.products.length; i++) {
          const productItem = order.products[i];
          const quantity = productItem.quantity;
          const product = await Product.findOne({ _id: productItem.productId });
          try {
            const stock = product.stock;
            const updateStock = await Product.findOneAndUpdate(
              {
                _id: product._id,
              },
              { stock: stock - quantity }
            );
          } catch (error) {
            console.log(error);
          }
        }
      }
    }
    res.status(200).json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// Get all
export const getAllOrder = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
};
// order stats
export const orderStats = async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await Order.aggregate([
      { $match: { createdAt: { $gte: lastYear }, status: "Success" } },

      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          total: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export const income = async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await Order.aggregate([
      { $match: { createdAt: { $gte: lastYear }, status: "Success" } },

      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          totalPrice: { $sum: "$amount" },
        },
      },
    ]);

    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
// // Update
// router.put("/:id", async (req, res) => {
//   try {
//     const updatedOrder = await Order.findByIdAndUpdate(
//       req.params.id,
//       {
//         $set: req.body,
//       },
//       { new: true }
//     );
//     res.status(200).json(updatedOrder);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

// // Delete
// router.delete("/:id", async (req, res) => {
//   try {
//     await Order.findByIdAndDelete(req.params.id);
//     res.status(200).json("Order has been deleted!");
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

// // Get mountly income

// router.get("/income", async (req, res) => {
//   const productId = req.query.pId;
//   const date = new Date();
//   const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
//   const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

//   try {
//     const income = await Order.aggregate([
//       {
//         $match: {
//           createdAt: { $gte: previousMonth },
//           ...(productId && {
//             products: { $elemMatch: { productId } },
//           }),
//         },
//       },
//       {
//         $project: {
//           month: { $month: "$createdAt" },
//           sales: "$amount",
//         },
//       },
//       {
//         $group: {
//           _id: "$month",
//           total: { $sum: "$sales" },
//         },
//       },
//     ]);
//     res.status(200).json(income);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

// export default router;
