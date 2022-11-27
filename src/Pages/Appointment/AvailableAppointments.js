import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import Loading from '../Shared/Loading';
import BookingModal from './BookingModal';
import Service from './Service';

const AvailableAppointments = ({date}) => {


    const [treatment, setTreatment] = useState(null);
    const handleTreatment = (treatment) =>{
        setTreatment(treatment,)
    }

    const formattedDate = format(date, 'PP');

    const { data : services, isLoading, refetch} = useQuery(['available', formattedDate], ()=>
        fetch(`http://localhost:5000/available?date=${formattedDate}`)
        .then(res => res.json())
    ) 
    if(isLoading){
        return <Loading></Loading>
    }

    return (
        <div>
            <h4 className="text-xl text-accent text-center">Available appointment on: {format(date, 'PP')}</h4>
            <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6">
                 {
                    services?.map(service => <Service key={service._id} service={service}  handleTreatment={handleTreatment} treatment={treatment}></Service>)
                }
            </div>
            {
                    treatment && <BookingModal refetch={refetch} treatment={treatment} date={date} setTreatment={setTreatment}></BookingModal>
            }
        </div>
    );
};

export default AvailableAppointments;