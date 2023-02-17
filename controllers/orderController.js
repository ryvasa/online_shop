import Order from "../models/OrderModel.js";

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
// Get all
export const getAllOrder = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
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
