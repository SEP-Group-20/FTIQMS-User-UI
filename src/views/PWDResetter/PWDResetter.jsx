import Swal from "sweetalert2";
import { updatePwd } from "../../services/UserService";
import { refreshLogin } from "../../services/AuthServices";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../../utils/auth";
import { MANAGER } from "../../utils/RolesList";
import Toast from "../../components/Toast";
const PWD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

function PWDResetter() {
  const { user } = useAuth().auth();
  const navigate = useNavigate();
  const doWork = async () => {
    // get password here
    const { value: password } = await Swal.fire({
      title: "Enter your password",
      text: "Since this is a newly created account, You must update your password before carrying out any operation!",
      input: "password",
      inputLabel: "Password",
      inputPlaceholder: "Enter your password",
      inputAttributes: {
        maxlength: 20,
        autocapitalize: "off",
        autocorrect: "off",
      },
      allowOutsideClick: false,
      allowEscapeKey: false,
      inputValidator: (value) => {
        if (!PWD_REGEX.test(value)) {
          return "Your password should have at least 8 characters with an Uppercase, a Lowercase, a Number, and a special Symbol!";
        }
      },
    });

    //   get confirmation here
    await Swal.fire({
      title: "Confirm your password",
      input: "password",
      inputPlaceholder: "Confirm your password",
      inputAttributes: {
        maxlength: 20,
        autocapitalize: "off",
        autocorrect: "off",
      },
      showConfirmButton: true,
      confirmButtonText: "Confirm",
      showDenyButton: true,
      preDeny: () => {
        window.location.reload();
      },
      denyButtonText: "Start Over",
      allowOutsideClick: false,
      allowEscapeKey: false,
      inputValidator: async (value) => {
        if (value !== password) {
          return "Passwords do not match!";
        }
        try {
          const result = await updatePwd({ newPwd: password });
          await refreshLogin();
          if (!result.data?.success)
            return "Something went wrong! please try again!";
        } catch (err) {
          return "Something went wrong! please try again!";
        }
      },
    });
    let to;
    if (user.role === MANAGER) to = "/fuelStationManager/home";
    else to = "/admin/home";

    Toast.fire({
      icon: "success",
      title: "Password changed successfully!",
    });

    navigate(to, { replace: true });
  };

  useEffect(() => {
    doWork();
  }, []);

  return (
    <h1></h1>
    // <Button
    //   onLoad={}={() => {
    //     doWork();
    //   }}
    // >
    //   OnCLick
    // </Button>
  );
}

export default PWDResetter;
