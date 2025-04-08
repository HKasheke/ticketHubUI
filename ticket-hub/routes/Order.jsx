import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

export default function Order() {
  // API URL
  const apiProd = import.meta.env.VITE_API_HOST_PRODUCTION + "/api/tickets";
  const apiDebug = import.meta.env.VITE_API_HOST_DEBUG + "/api/tickets";

  const { register, handleSubmit, formState: { errors } } = useForm();

  // Add new order to API
  function addOrder(data) {
    // Create the purchase object matching the C# model
    const purchase = {
      concertId: parseInt(data.concertId),
      email: data.email,
      name: `${data.firstName} ${data.lastName}`,
      phone: data.phone,
      quantity: parseInt(data.quantity),
      creditCard: data.creditCard,
      expiration: data.expiration,
      securityCode: data.securityCode,
      address: data.address,
      city: data.city,
      province: data.province,
      postalCode: data.postalCode,
      country: data.country
    };

    // Post data to API
    async function postData() {
      const response = await fetch(apiProd, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(purchase),
      });

      if (response.ok) {
        window.location.href = '/';
      } else {
        console.error('Error:', response.status);
        response.text().then(text => {
          console.error('Response:', text);
        });
      }
    }

    postData();
  }

  return (
    <>
      <h1>Place Order</h1>

      <form onSubmit={handleSubmit(addOrder)} method="post">
        <div className="mb-3">
          <label className="form-label">Concert ID</label>
          <input {...register("concertId", { required: true })} type="number" className="form-control bg-light" />
          {errors.concertId && <span className="text-danger">Concert ID is required.</span>}
        </div>
        <div className="mb-3">
          <label className="form-label">First Name</label>
          <input {...register("firstName", { required: true })} type="text" className="form-control bg-light" />
          {errors.firstName && <span className="text-danger">First name is required.</span>}
        </div>
        <div className="mb-3">
          <label className="form-label">Last Name</label>
          <input {...register("lastName", { required: true })} type="text" className="form-control bg-light" />
          {errors.lastName && <span className="text-danger">Last name is required.</span>}
        </div>
        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input {...register("phone", { required: true })} type="text" className="form-control bg-light" />
          {errors.phone && <span className="text-danger">Phone number is required.</span>}
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input {...register("email", { required: true })} type="email" className="form-control bg-light" />
          {errors.email && <span className="text-danger">Email is required.</span>}
        </div>
        <div className="mb-3">
          <label className="form-label">Quantity</label>
          <input {...register("quantity", { required: true })} type="number" className="form-control bg-light" />
          {errors.quantity && <span className="text-danger">Quantity is required.</span>}
        </div>
        <div className="mb-3">
          <label className="form-label">Credit Card</label>
          <input {...register("creditCard", { required: true, pattern: /^[0-9]{16}$/ })} type="text" className="form-control bg-light" />
          {errors.creditCard && <span className="text-danger">Credit card number is required and must be 16 digits.</span>}
        </div>
        <div className="mb-3">
          <label className="form-label">Expiration</label>
          <input {...register("expiration", { required: true })} type="text" placeholder="MM/YY" className="form-control bg-light" />
          {errors.expiration && <span className="text-danger">Expiration date is required.</span>}
        </div>
        <div className="mb-3">
          <label className="form-label">Security Code</label>
          <input {...register("securityCode", { required: true, pattern: /^[0-9]{3,4}$/ })} type="text" className="form-control bg-light" />
          {errors.securityCode && <span className="text-danger">Security code is required and must be 3-4 digits.</span>}
        </div>
        <div className="mb-3">
          <label className="form-label">Address</label>
          <input {...register("address", { required: true })} type="text" className="form-control bg-light" />
          {errors.address && <span className="text-danger">Address is required.</span>}
        </div>
        <div className="mb-3">
          <label className="form-label">City</label>
          <input {...register("city", { required: true })} type="text" className="form-control bg-light" />
          {errors.city && <span className="text-danger">City is required.</span>}
        </div>
        <div className="mb-3">
          <label className="form-label">Province</label>
          <input {...register("province", { required: true })} type="text" className="form-control bg-light" />
          {errors.province && <span className="text-danger">Province is required.</span>}
        </div>
        <div className="mb-3">
          <label className="form-label">Postal Code</label>
          <input {...register("postalCode", { required: true })} type="text" className="form-control bg-light" />
          {errors.postalCode && <span className="text-danger">Postal code is required.</span>}
        </div>
        <div className="mb-3">
          <label className="form-label">Country</label>
          <input {...register("country", { required: true })} type="text" className="form-control bg-light" />
          {errors.country && <span className="text-danger">Country is required.</span>}
        </div>

        <button type="submit" className="btn btn-primary">Place Order</button>
        <Link to="/" className="btn btn-outline-secondary ms-5">Cancel</Link>
      </form>
    </>
  );
}