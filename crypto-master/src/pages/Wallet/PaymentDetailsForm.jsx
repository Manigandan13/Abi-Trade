
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addPaymentDetails } from "@/Redux/Withdrawal/Action";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const formSchema = yup.object().shape({
  accountHolderName: yup.string().required("Account holder name is required"),
  ifsc: yup.string().length(11, "IFSC code must be 11 characters"),
  accountNumber: yup.string().required("Account number is required"),
  confirmAccountNumber: yup.string().test({
    name: "match",
    message: "Account numbers do not match",
    test: function (value) {
      return value === this.parent.accountNumber;
    },
  }),
  bankName: yup.string().required("Bank name is required"),
});

const PaymentDetailsForm = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const onSubmit = (data) => {
    dispatch(
      addPaymentDetails({
        paymentDetails: data,
        jwt: localStorage.getItem("jwt"),
      })
    );
  };

  return (
    <div className="px-2 py-3 text-gray-800">
      <h1 className="text-lg md:text-xl font-semibold mb-5 text-center text-gray-900">
        Add Bank Details
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {[
          { name: "accountHolderName", placeholder: "Account holder name" },
          { name: "ifsc", placeholder: "IFSC Code" },
          { name: "accountNumber", placeholder: "Account Number" },
          { name: "confirmAccountNumber", placeholder: "Confirm Account Number" },
          { name: "bankName", placeholder: "Bank Name" },
        ].map((field, i) => (
          <div key={i}>
            <input
              {...register(field.name)}
              className="w-full bg-white border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black transition"
              placeholder={field.placeholder}
            />
            {errors[field.name] && (
              <p className="text-xs text-red-500 mt-1">{errors[field.name].message}</p>
            )}
          </div>
        ))}

        <div>
          <button
            type="submit"
            className="w-full bg-black text-white font-semibold py-2.5 rounded-md text-sm hover:bg-gray-900 transition"
            disabled={auth.loading}
          >
            {auth.loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentDetailsForm;

