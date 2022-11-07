import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Swal from "sweetalert2";
import Toast from "../../../components/Toast";
import { refreshLogin } from "../../../services/AuthServices";
import { setInitalFuelStat } from "../../../services/fuelStationServices";

function FuelAmountSetter() {
  const navigate = useNavigate();
  const doWork = async () => {
    //getting petrol amount
    const { value: petrolAmount } = await Swal.fire({
      title: "Remaining Petrol Amount",
      text: "Give value in liters",
      input: "number",
      inputLabel: "",
      confirmButtonText: "Go",
      inputPlaceholder: "Petrol Amount",
      allowOutsideClick: false,
      allowEscapeKey: false,
      inputValidator: (value) => {
        if (value < 0) {
          return "Remaining petrol amount cannot be a negative value";
        }
      },
    });

    const { value: dieselAmount } = await Swal.fire({
      title: "Remaining Diesel Amount",
      text: "Give value in liters",
      input: "number",
      inputLabel: "",
      confirmButtonText: "Confirm",
      showDenyButton: true,
      denyButtonText: "Start Over",
      preDeny: () => {
        window.location.reload();
      },
      inputPlaceholder: "Diesel Amount",
      allowOutsideClick: false,
      allowEscapeKey: false,
      inputValidator: async (value) => {
        if (value < 0) {
          return "Remaining diesel amount cannot be a negative value";
        }
        try {
          const fuel = {
            Petrol: parseFloat(petrolAmount),
            Diesel: parseFloat(value),
          };
          const result = await setInitalFuelStat({ fuel: fuel });
          if (result.data?.success) {
            await refreshLogin();
          } else return "Something went wrong!";
        } catch (err) {
          console.log(err);
          return "Something went wrong!";
        }
      },
    });

    Toast.fire({
      icon: "success",
      title: "set fuel status successfully!",
    });

    navigate("/fuelStationManager/home", { replace: true });
  };

  useEffect(() => {
    doWork();
  }, []);
  return <h1></h1>;
}

export default FuelAmountSetter;
