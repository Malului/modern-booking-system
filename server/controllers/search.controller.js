import prisma from "../prisma.js"

const searchTripAvailability = async (req, res) => {
    //get details

    //Details:-
    // departureDate: "2025-04-10"
    // departureTime: "morning"
    // fromStation: "nairobi"
    // returnDate: null
    // returnTime: null
    // toStation: "mombasa"
    // trainType: "express"
    // tripType: "one-way"

    //Get details from params
    //Parse departureDate
    //find dep and arrival station IDs
    //find relevant schedule
    //find trip
    //calculate available seats


    try {
        const {
            departureDate,
            departureTime,
            fromStation,
            returnDate,
            returnTime,
            toStation,
            trainType,
            tripType
        } = req.body;

        const parsedDate = new Date(departureDate);

        //find departure station id
        const departureStation = await prisma.station.findUnique({
            where: {
                name: fromStation
            },
            select: {
                id: true,
                name: true,
                code: true
            }
        })

        //find arrival station id
        const arrivalStation = await prisma.station.findUnique({
            where: {
                name: toStation
            },
            select: {
                id: true,
                name: true,
                code: true
            }
        })

        if(!departureStation || !arrivalStation) {
            return res.status(404).json({
                error: "Stations not found"
            })
        }

        // //find relevant schedule
        const schedulesTemplates = await prisma.scheduleTemplate.findFirst({
            where: {
                departureStationId: departureStation.id,
                arrivalStationId: arrivalStation.id,
                departureTime: departureTime.toUpperCase(),
                train: {
                    trainType: trainType.toUpperCase()
                }
            },
            include: {
                departureStation: true,
                arrivalStation: true,
                train: {
                    select: {
                        id: true,
                        trainType: true,
                        capacity: true
                    }
                }
            }
        })

        if (!schedulesTemplates) {
            return res.status(404).json({
                success: false,
                error: "Schedule Template not found"
            })
        }

        // //find trip based on schedule
        // const trip = await prisma.trip.findUnique({
        //     where: {
        //         scheduleId: {
        //             in: schedulesTemplates.map(template => template.id)
        //         },
        //         departureDate: new Date(parsedDate),
        //         tripType: tripType.toUpperCase() === "ONE-WAY" ? "ONE_WAY" : "RETURN"
        //     },
        //     include: {
        //         schedule: {
        //             include: {
        //                 departureStation: true,
        //                 arrivalStation: true,

        //                 train: true
        //             }
        //         },
        //         bookings: {
        //             select: {
        //                 id: true
        //             }
        //         }
        //     }
        // })

        // if (!trip) {
        //     return res.status(404).json({
        //         success: false,
        //         error: "Trip not found"
        //     })
        // }

        return res.status(201).json({
            success: true,
            data: schedulesTemplates
            //data: trip
        })
    } catch (error) {
        return res.status(500).json({
            error: "Could not fetch data"
        })
    }
}

export default searchTripAvailability;