const { useState } = React;
        const { createStore } = Redux;
        const { Provider, useDispatch, useSelector } = ReactRedux;

        // Reducer actions and initial state
        const initialState = {
            logo: null,
            menuItems: ['Home', 'Schedule', 'Recommendation', 'Analytics', 'Profile', 'Inbox', 'Themes'],
            selectedMenuItem: 'Home',
            account: {
                settings: {
                    notifications: true,
                    darkMode: false,
                }
            },
            theme: {
                solidColor: '#ffffff',
                linearGradient: {
                    angle: 0,
                    startColor: '#ffffff',
                    endColor: '#000000',
                },
                radialGradient: {
                    startColor: '#ffffff',
                    endColor: '#000000',
                },
                foregroundColor: '#000000',
            },
            portfolio: {
                name: '',
                designation: '',
                location: '',
                email: '',
                phone: '',
                hobbies: '',
                projects: '',
                experience: '',
                bio: '',
                backgroundColor: '#ffffff',
                foregroundColor: '#000000',
                gradientType: 'solid',
                backgroundImage: '',
                profileImage: '',
            },
        };

        const rootReducer = (state = initialState, action) => {
            switch (action.type) {
                case 'UPLOAD_LOGO':
                    return {
                        ...state,
                        logo: action.payload,
                    };
                case 'DELETE_LOGO':
                    return {
                        ...state,
                        logo: null,
                    };
                case 'SELECT_MENU_ITEM':
                    return {
                        ...state,
                        selectedMenuItem: action.payload,
                    };
                case 'UPDATE_THEME':
                    return {
                        ...state,
                        theme: {
                            ...state.theme,
                            ...action.payload,
                        },
                    };
                case 'UPDATE_PORTFOLIO':
                    return {
                        ...state,
                        portfolio: {
                            ...state.portfolio,
                            ...action.payload,
                        },
                    };
                default:
                    return state;
            }
        };

        const store = createStore(rootReducer);

        const App = () => {
            return (
                <Provider store={store}>
                    <div className="container mx-auto p-4">
                        <LogoManagement />
                        <MenuSection />
                        <AccountSection />
                        <ThemeSelection />
                        <PortfolioTemplate />
                    </div>
                </Provider>
            );
        };

        const LogoManagement = () => {
            const dispatch = useDispatch();
            const logo = useSelector(state => state.logo);

            const handleLogoChange = (event) => {
                const file = event.target.files[0];
                if (file) {
                    dispatch({ type: 'UPLOAD_LOGO', payload: file });
                }
            };

            const handleLogoDelete = () => {
                dispatch({ type: 'DELETE_LOGO' });
            };

            return (
                <div className="mb-4">
                    <h2 className="text-lg font-bold">Logo Management</h2>
                    {logo ? (
                        <div className="flex items-center mt-2">
                            <img src={URL.createObjectURL(logo)} alt="Logo" className="w-12 h-12 mr-2" />
                            <button onClick={handleLogoDelete} className="bg-red-500 text-white py-1 px-2 rounded">Delete Logo</button>
                        </div>
                    ) : (
                        <div>
                            <label className="block">Upload Logo:</label>
                            <input type="file" accept="image/*" onChange={handleLogoChange} />
                        </div>
                    )}
                </div>
            );
        };

        const MenuSection = () => {
            const dispatch = useDispatch();
            const { menuItems, selectedMenuItem } = useSelector(state => state);

            const handleMenuItemClick = (menuItem) => {
                dispatch({ type: 'SELECT_MENU_ITEM', payload: menuItem });
            };

            return (
                <div className="mb-4">
                    <h2 className="text-lg font-bold">Menu</h2>
                    <div className="flex flex-wrap mt-2">
                        {menuItems.map(item => (
                            <button
                                key={item}
                                onClick={() => handleMenuItemClick(item)}
                                className={`mr-4 mb-2 py-1 px-3 rounded ${selectedMenuItem === item ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </div>
            );
        };

        const AccountSection = () => {
            return (
                <div className="mb-4">
                    <h2 className="text-lg font-bold">Account</h2>
                    <button className="mt-2 bg-blue-500 text-white py-1 px-3 rounded">Settings</button>
                </div>
            );
        };

        const ThemeSelection = () => {
            const dispatch = useDispatch();
            const { theme } = useSelector(state => state);

            const handleThemeChange = (field, value) => {
                dispatch({ type: 'UPDATE_THEME', payload: { [field]: value } });
            };

            return (
                <div className="mb-4">
                    <h2 className="text-lg font-bold">Themes</h2>
                    <div className="mt-2">
                        <h3 className="text-md font-semibold">Solids</h3>
                        <input
                            type="color"
                            value={theme.solidColor}
                            onChange={(e) => handleThemeChange('solidColor', e.target.value)}
                            className="block mt-1"
                        />
                        <h3 className="text-md font-semibold mt-2">Linear Gradients</h3>
                        <input
                            type="color"
                            value={theme.linearGradient.startColor}
                            onChange={(e) => handleThemeChange('linearGradient', { ...theme.linearGradient, startColor: e.target.value })}
                            className="block mt-1"
                        />
                        <input
                            type="color"
                            value={theme.linearGradient.endColor}
                            onChange={(e) => handleThemeChange('linearGradient', { ...theme.linearGradient, endColor: e.target.value })}
                            className="block mt-1"
                        />
                        <h3 className="text-md font-semibold mt-2">Radial Gradients</h3>
                        <input
                            type="color"
                            value={theme.radialGradient.startColor}
                            onChange={(e) => handleThemeChange('radialGradient', { ...theme.radialGradient, startColor: e.target.value })}
                            className="block mt-1"
                        />
                        <input
                            type="color"
                            value={theme.radialGradient.endColor}
                            onChange={(e) => handleThemeChange('radialGradient', { ...theme.radialGradient, endColor: e.target.value })}
                            className="block mt-1"
                        />
                        <h3 className="text-md font-semibold mt-2">Foreground Color</h3>
                        <input
                            type="color"
                            value={theme.foregroundColor}
                            onChange={(e) => handleThemeChange('foregroundColor', e.target.value)}
                            className="block mt-1"
                        />
                    </div>
                </div>
            );
        };

        const PortfolioTemplate = () => {
            const dispatch = useDispatch();
            const { portfolio } = useSelector(state => state);

            const handlePortfolioChange = (field, value) => {
                dispatch({ type: 'UPDATE_PORTFOLIO', payload: { [field]: value } });
            };

            return (
                <div className="mb-4">
                    <h2 className="text-lg font-bold">Portfolio Template</h2>
                    <div>
                        <label className="block">Name:</label>
                        <input
                            type="text"
                            value={portfolio.name}
                            onChange={(e) => handlePortfolioChange('name', e.target.value)}
                            className="block w-full mt-1"
                        />
                    </div>
                    <div>
                        <label className="block">Designation:</label>
                        <input
                            type="text"
                            value={portfolio.designation}
                            onChange={(e) => handlePortfolioChange('designation', e.target.value)}
                            className="block w-full mt-1"
                        />
                    </div>
                    <div>
                        <label className="block">Location:</label>
                        <input
                            type="text"
                            value={portfolio.location}
                            onChange={(e) => handlePortfolioChange('location', e.target.value)}
                            className="block w-full mt-1"
                        />
                    </div>
                    <div>
                        <label className="block">Email:</label>
                        <input
                            type="email"
                            value={portfolio.email}
                            onChange={(e) => handlePortfolioChange('email', e.target.value)}
                            className="block w-full mt-1"
                        />
                    </div>
                    <div>
                        <label className="block">Phone:</label>
                        <input
                            type="tel"
                            value={portfolio.phone}
                            onChange={(e) => handlePortfolioChange('phone', e.target.value)}
                            className="block w-full mt-1"
                        />
                    </div>
                    <div>
                        <label className="block">Hobbies:</label>
                        <textarea
                            value={portfolio.hobbies}
                            onChange={(e) => handlePortfolioChange('hobbies', e.target.value)}
                            className="block w-full mt-1"
                        ></textarea>
                    </div>
                    <div>
                        <label className="block">Projects:</label>
                        <textarea
                            value={portfolio.projects}
                            onChange={(e) => handlePortfolioChange('projects', e.target.value)}
                            className="block w-full mt-1"
                        ></textarea>
                    </div>
                    <div>
                        <label className="block">Experience:</label>
                        <textarea
                            value={portfolio.experience}
                            onChange={(e) => handlePortfolioChange('experience', e.target.value)}
                            className="block w-full mt-1"
                        ></textarea>
                    </div>
                    <div>
                        <label className="block">Bio:</label>
                        <textarea
                            value={portfolio.bio}
                            onChange={(e) => handlePortfolioChange('bio', e.target.value)}
                            className="block w-full mt-1"
                        ></textarea>
                    </div>
                    <div className="mt-4">
                        <label className="block">Background Color:</label>
                        <input
                            type="color"
                            value={portfolio.backgroundColor}
                            onChange={(e) => handlePortfolioChange('backgroundColor', e.target.value)}
                            className="block mt-1"
                        />
                    </div>
                    <div className="mt-2">
                        <label className="block">Foreground Color:</label>
                        <input
                            type="color"
                            value={portfolio.foregroundColor}
                            onChange={(e) => handlePortfolioChange('foregroundColor', e.target.value)}
                            className="block mt-1"
                        />
                    </div>
                    <div className="mt-2">
                        <label className="block">Gradient Type:</label>
                        <select
                            value={portfolio.gradientType}
                            onChange={(e) => handlePortfolioChange('gradientType', e.target.value)}
                            className="block w-full mt-1"
                        >
                            <option value="solid">Solid</option>
                            <option value="linear">Linear Gradient</option>
                            <option value="radial">Radial Gradient</option>
                        </select>
                    </div>
                    <div className="mt-2">
                        <label className="block">Background Image:</label>
                        <input
                            type="text"
                            value={portfolio.backgroundImage}
                            onChange={(e) => handlePortfolioChange('backgroundImage', e.target.value)}
                            placeholder="URL or upload"
                            className="block w-full mt-1"
                        />
                    </div>
                    <div className="mt-2">
                        <label className="block">Profile Image:</label>
                        <input
                            type="text"
                            value={portfolio.profileImage}
                            onChange={(e) => handlePortfolioChange('profileImage', e.target.value)}
                            placeholder="URL or upload"
                            className="block w-full mt-1"
                        />
                    </div>
                    <div className="mt-4">
                        <button className="bg-blue-500 text-white py-2 px-4 rounded">Save</button>
                    </div>
                </div>
            );
        };
        

        ReactDOM.render(<App />, document.getElementById('root'));