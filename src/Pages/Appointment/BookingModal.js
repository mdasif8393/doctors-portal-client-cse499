import React from 'react';
import { format } from 'date-fns';
import auth from '../../firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';

const BookingModal = ({treatment, date, setTreatment, refetch}) => {

    const [user, loading, error] = useAuthState(auth);
    const formattedDate = format(date, 'PP')
    const {name, slots, _id, price} = treatment;

    const handleBooking = (event) => {
        event.preventDefault();
        const slot = event.target.slot.value;

        const booking = {
            treatmentId: _id,
            treatment: name,
            date: formattedDate,
            slot,
            price,
            patient: user?.email,
            patientName: user?.displayName,
            phone: event?.target?.phone?.value,
        }

        fetch("http://localhost:5000/booking", {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body : JSON.stringify(booking)
        })
        .then(res => res.json())
        .then(data => {
            if(data?.success){
                toast( `Appointment is set, ${formattedDate} at ${slot}`)
            }
            else{
                toast.error(`You already have an appointment on ${data.booking?.date} at ${data.booking?.slot}`);
            }

            //to close the modal
            refetch()
            setTreatment(null)
        })

        
    }

    return (
        <div>
            <input type="checkbox" id="booking-modal" className="modal-toggle " />
            <div className="modal modal-bottom sm:modal-middle ">
                <div className="modal-box bg-white">
                <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>

                    <h3 className="font-bold text-lg text-accent">Booking for: {name}</h3>
                    <form onSubmit={handleBooking} className="grid grid-cols-1 gap-3 justify-items-center mt-2">
                        <input name="date" type="text" disabled value={format(date, 'PP')} className="input w-full max-w-xs bg-white" />
                        <select name="slot" className="select select-bordered w-full max-w-xs bg-white">
                            {
                                slots.map((slot, index) => <option value={slot} key={index}>{slot}</option>)
                            }                        
                        </select>
                        <input name="name" type="text" value={user?.displayName || ''} disabled className="input w-full max-w-xs bg-white" />
                        <input name="email" type="email" value={user?.email || ''} disabled className="input w-full max-w-xs bg-white" />
                        <input name="phone" required type="number" placeholder="Your Number" className="input w-full max-w-xs bg-white" />
                        <input type="submit" value="Submit" className="btn btn-accent w-3/4"/>
                    </form>
                <div className="modal-action">
                </div>
            </div>+
</div>
        </div>
    );
};

export default BookingModal;