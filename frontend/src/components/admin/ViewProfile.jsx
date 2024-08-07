import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { useUsersContext } from "../../hooks/useUsersContext";
import { Container, Typography, Box, Paper, Modal, Backdrop, Fade } from '@mui/material';
import EditUserInfo from '../../pages/profile/EditUserInfo'
import moment from 'moment';

// Function to shorten ObjectId
const objectIdToShortId = (objectId) => {
    const hexString = objectId.toString();
    return hexString.substring(20, 26);
};

const ViewProfile = () => {
    const { id } = useParams();
    const { userlgs } = useUsersContext();
    const [openModal, setOpenModal] = useState(false);

    // Find the userlg with the specified ID
    const userlg = userlgs.find(userlg => userlg._id === id);

    const formattedBirthday = moment(userlg.birthday).format('MMMM Do, YYYY');

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    return (
        <Container>
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="90vh">
                <Paper elevation={3} sx={{ padding: '50px', borderRadius: 6, boxShadow: '1px 1px 8px rgba(0, 0, 0, 0.065)', backgroundColor: '#101624', maxWidth: '500px', width: '100%' }}>
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <Box mb={4}>
                            <img
                                alt="profile-user"
                                width="150px"
                                height="150px"
                                src={process.env.PUBLIC_URL + '/users.png'}
                                className="cursor-pointer rounded-full"
                            />
                        </Box>
                        <Typography variant="h4" component="h2" gutterBottom style={{ color: '#e0e0e0', fontWeight: 'bold', marginBottom: '20px' }}>{userlg.name}</Typography>
                        <Typography variant="h6" gutterBottom style={{ color: '#4cceac', marginBottom: '30px' }}>{userlg.role}</Typography>
                        <div className="view-details" style={{ textAlign: 'center' }}>
                            <Typography variant="body1" component="p" fontSize="24px" style={{ color: '#94e2cd', marginBottom: '20px' }}><strong>Employee ID: </strong><span style={{ color: 'white' }}>{objectIdToShortId(userlg._id)}</span></Typography>
                            <Typography variant="body1" component="p" fontSize="24px" style={{ color: '#94e2cd', marginBottom: '20px' }}><strong>Birthday: </strong><span style={{ color: 'white' }}>{formattedBirthday}</span></Typography>
                            <Typography variant="body1" component="p" fontSize="24px" style={{ color: '#94e2cd', marginBottom: '20px' }}><strong>Phone Number: </strong><span style={{ color: 'white' }}>{userlg.number}</span></Typography>
                            <Typography variant="body1" component="p" fontSize="24px" style={{ color: '#94e2cd', marginBottom: '20px' }}><strong>Email: </strong><span style={{ color: 'white' }}>{userlg.email}</span></Typography>
                            <Typography variant="body1" component="p" fontSize="24px" style={{ color: '#94e2cd', marginBottom: '20px' }}><strong>Address: </strong><span style={{ color: 'white' }}>{userlg.homeaddress}</span></Typography>
                            <Typography variant="body1" component="p" fontSize="24px" style={{ color: '#94e2cd', marginBottom: '20px' }}><strong>Gender: </strong><span style={{ color: 'white' }}>{userlg.gender}</span></Typography>
                            <Box sx={{ backgroundColor: '#3e4396', padding: '10px', borderRadius: '4px', display: 'inline-block' }}>
                                <Link to="#" style={{ color: '#e0e0e0', textDecoration: 'none', padding: '9px 12px', borderRadius: '4px' }} onClick={handleOpenModal}>
                                    Update Profile
                                </Link>
                            </Box>
                        </div>
                    </Box>
                </Paper>
            </Box>
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openModal}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                        <EditUserInfo userId={userlg._id} onClose={handleCloseModal} />
                    </Box>
                </Fade>
            </Modal>
        </Container>
    );
};

export default ViewProfile;
