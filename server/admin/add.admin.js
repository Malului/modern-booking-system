import prisma from "../prisma.js"

export const addStation = async (req, res) => {
    //get details
    //add
    //id, name, code, departureSchedules(arrival)

    const {
        name,
        code
    } = req.body;
    
    try {
        const station = await prisma.station.create({
            data: {
                name,
                code
            }
        })
    
        if (!station) {
            return res.status(401).json({
                success: false,
                error: "Could not create station"
            })
        }
    
        return res.status(201).json({
            success: true,
            data: station
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: "Error creating station"
        })
    }
}    

export const addTrain = async (req, res) => {
    //id, trainType, capacity,

    const {
        trainType,
        capacity
    } = req.body;

    const parsedTrainType = trainType.toUpperCase();
    const parsedCapacity = parseInt(capacity);

    try {
        const train = await prisma.train.create({
            data: {
                trainType: parsedTrainType,
                capacity: parsedCapacity
            }
        })

    if (!train) {
        return res.status(400).json({
            success: false,
            error: "Could not create a train"
        })
    }

    return res.status(201).json({
        success: true,
        data: train
    })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: "Error creating train"
        })
    }
}

export const addScheduleTemplate = async (req, res) => {
    //get details
    //create id, depTime, depStationId, arrstationId, trainId

    const {
        departureTime,
        departureStation,
        arrivalStation,
        train
    } = req.body;

    const parsedDepStation = parseInt(departureStation)
    const parsedArrStation = parseInt(arrivalStation)
    const parsedTrain = parseInt(train)
    const parsedDepTime = departureTime.toUpperCase()

    try {
        const schedule = await prisma.scheduleTemplate.create({
        data: {
            departureTime: parsedDepTime,
            departureStation: {
                connect: {
                    id: parsedDepStation
                }
            },
            arrivalStation: {
                connect: {
                    id: parsedArrStation
                }
            },
            train: {
                connect: {
                    id: parsedTrain
                }
            }
        },
        include: {
            departureStation: true,
            arrivalStation: true,
            train: true
        }

        })

        if (!schedule) {
            return res.status(400).json({
                success: false,
                error: "Could not create schedule"
            })
        }

        return res.status(201).json({
            success: true,
            data: schedule
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: "Server error while creating schedule"
        })
    }
}

export const addTrip = async (req, res) => {
    //get details- id, departureDate, tripType, scheduleId, bookings

    const {
        departureDate,
        tripType,
        schedule
    } = req.body;

    const parsedTripType = (tripType.toUpperCase() === "RETURN") ? "RETURN" : "ONE_WAY"
    const parsedSchedule = parseInt(schedule)
    const parsedDepDate = new Date(departureDate)

    console.log(parsedDepDate)

    try {
        const trip = await prisma.trip.create({
            data: {
                departureDate: parsedDepDate,
                tripType: parsedTripType,
                schedule: {
                    connect: {
                        id: parsedSchedule
                    }
                }
            },
            include: {
                schedule: true
            }
        })

        if (!trip) {
            return res.status(400).json({
                success: false,
                error: "Could not create a trip"
            })
        }

        return res.status(201).json({
            success: true,
            data: trip
        })
    } catch (error) {
        console.error("Trip error:", error)
        return res.status(500).json({
            success: false,
            error: "Error, Could not create a trip"
        })
    }
}