import api from "../services/api"; 


//  Get list of drivers (users with role = driver)
export const getDrivers = async () => {
  const res = await api.get("/admin/drivers");
  return res.data;
};

//  Assign logistics to a driver
export const assignLogistics = async (data: {
  order_id: number;
  vehicle_number_plate?: string;
  transport_mode?: string;
  pickup_location?: string;
  dropoff_location?: string;
}) => {
  const res = await api.post(`/admin/orders/${data.order_id}/assign-driver`, {
    vehicle_number_plate: data.vehicle_number_plate,
    transport_mode: data.transport_mode,
    pickup_location: data.pickup_location,
    dropoff_location: data.dropoff_location,
  });
  return res.data;
};

// Get logistics by order ID
export const getLogisticsByOrder = async (orderId: number) => {
  const res = await api.get(`/admin/logistics/order/${orderId}`);
  return res.data;
};

//  Mark delivery as completed
export const markDelivered = async (logisticsId: number) => {
  const res = await api.put(`/admin/logistics/delivered/${logisticsId}`);
  return res.data;
};

//  Get all logistics
export const getLogistics = async () => {
  const res = await api.get("/admin/logistics");
  return res.data;
};

//  Update logistics
export const updateLogistics = async (id: number, updates: any) => {
  const res = await api.put(`/admin/logistics/${id}`, updates);
  return res.data;
};

// Delete logistics entry
export const deleteLogistics = async (id: number) => {
  const res = await api.delete(`/admin/logistics/${id}`);
  return res.data;
};
