import Swal from "sweetalert2";

export default function PotvrdaSweetAlert(
    onConfirm: any,
    title: string = "Da li ste sigurni?",
    confirmButtonText: string = "Izbriši",
    cancelButtonText: string = "Otkaži",
) {
    Swal.fire({
        title,
        confirmButtonText,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText,
    }).then(rezultat => {
        if (rezultat.isConfirmed) {
            onConfirm();
        }
    })
}