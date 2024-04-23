export default interface order {
    id: number //订单id
    title: number //名称
    price: number //价格
    gid: number //商品id
    uid: number //用户id
    num: number //购买数量
    address: string //收货地址
    createTime: string //订单创建时间
    payTime: string //支付时间
    deliveryTime: string //发货时间
    confirmTime: string //确认时间
    deliveryMethod: string //发货方式
    status: number
}
