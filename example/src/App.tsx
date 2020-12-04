import React from 'react'
import 'light-react-grid/dist/index.css'
import {Column, Grid, useBreakpoint} from "light-react-grid";

const App = () => {
    const breakpoint = useBreakpoint();

    return <div className="container">
        <h1>Grid usage examples</h1>
        <p>Use CTRL + G to toggle Grid helper</p>
        <section className="section">
            <Grid>
                <Column size={{sm: 4, md: 3, lg: 2}}>
                    <div className="colorized">Small 4 columns, Medium 3 columns, large: two columns</div>
                </Column>
                <Column size={{sm: 2}}>
                    <p className="colorized">
                        {breakpoint === 'sm' && 'Small 2 columns.'}
                        {breakpoint !== 'sm' && 'Medium & large aren\'t defined, so it will use 100%.'}
                    </p>
                </Column>
            </Grid>
        </section>
        <section className="section">
            <h2>Multiple items</h2>
            <Grid>
                {[...Array(17)].fill('m-items').map((item, index) =>
                    <Column key={`${item}-${index}`} size={{sm: 2, md: 3, lg: 3}}>
                        <div className="colorized multiple-items__item">Column</div>
                    </Column>)
                }
                {breakpoint === 'sm' && <Column size={{sm: 4}}><p className="colorized">I'm only showing on small breakpoint</p></Column>}
            </Grid>
        </section>
        <section className="section">
            <h2>Images example</h2>
            <Grid>
                <Column size={{sm: 4, md: 4, lg: 3}}>
                    <div className="image-wrapper">
                        <img
                            alt="Dražen Petrović"
                            className="image"
                            src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2c4bcaa5-0d9b-4342-b287-6d2d50ab5884/d6yjqcy-de41569e-ba58-4ab6-98ef-11be0176f5d9.jpg/v1/fill/w_600,h_800,q_75,strp/drazen_petrovic_by_sutija_d6yjqcy-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvMmM0YmNhYTUtMGQ5Yi00MzQyLWIyODctNmQyZDUwYWI1ODg0XC9kNnlqcWN5LWRlNDE1NjllLWJhNTgtNGFiNi05OGVmLTExYmUwMTc2ZjVkOS5qcGciLCJoZWlnaHQiOiI8PTgwMCIsIndpZHRoIjoiPD02MDAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uud2F0ZXJtYXJrIl0sIndtayI6eyJwYXRoIjoiXC93bVwvMmM0YmNhYTUtMGQ5Yi00MzQyLWIyODctNmQyZDUwYWI1ODg0XC9zdXRpamEtNC5wbmciLCJvcGFjaXR5Ijo5NSwicHJvcG9ydGlvbnMiOjAuNDUsImdyYXZpdHkiOiJjZW50ZXIifX0.3v6BAP1tXo4BsIVTli-OUFDzODz2HJIX67rVtecxIjE"
                        />
                        <cite className="cite">Dražen Petrović (Author: Marko Šutija)</cite>
                    </div>
                </Column>
                <Column size={{sm: 4, md: 4, lg: 6}}>
                    <div className="image-wrapper">
                        <img
                            alt="Dražen Petrović"
                            className="image"
                            src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2c4bcaa5-0d9b-4342-b287-6d2d50ab5884/d6xi2js-50357cf7-cf3d-4de7-9657-18d3c17ff443.jpg/v1/fill/w_800,h_583,q_75,strp/western_by_sutija_d6xi2js-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvMmM0YmNhYTUtMGQ5Yi00MzQyLWIyODctNmQyZDUwYWI1ODg0XC9kNnhpMmpzLTUwMzU3Y2Y3LWNmM2QtNGRlNy05NjU3LTE4ZDNjMTdmZjQ0My5qcGciLCJoZWlnaHQiOiI8PTU4MyIsIndpZHRoIjoiPD04MDAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uud2F0ZXJtYXJrIl0sIndtayI6eyJwYXRoIjoiXC93bVwvMmM0YmNhYTUtMGQ5Yi00MzQyLWIyODctNmQyZDUwYWI1ODg0XC9zdXRpamEtNC5wbmciLCJvcGFjaXR5Ijo5NSwicHJvcG9ydGlvbnMiOjAuNDUsImdyYXZpdHkiOiJjZW50ZXIifX0.wCZ--sTcp9KHS0p8nIH_5PcVxivu60eEews6_9DZabo"
                        />
                        <cite className="cite">Rider (Author: Marko Šutija)</cite>
                    </div>
                </Column>
            </Grid>
        </section>
        <section className="section">
            <h2>Nested grids</h2>
            <Grid>
                <Column size={{sm: 4, md: 6, lg: 6}}>
                    <p>Grid inside column</p>
                    <Grid>
                        <Column size={{sm: 2, md: 3, lg: 3}}>
                            <div className="image-wrapper">
                                <img
                                    alt="Dražen Petrović"
                                    className="image"
                                    src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2c4bcaa5-0d9b-4342-b287-6d2d50ab5884/d6yjqcy-de41569e-ba58-4ab6-98ef-11be0176f5d9.jpg/v1/fill/w_600,h_800,q_75,strp/drazen_petrovic_by_sutija_d6yjqcy-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvMmM0YmNhYTUtMGQ5Yi00MzQyLWIyODctNmQyZDUwYWI1ODg0XC9kNnlqcWN5LWRlNDE1NjllLWJhNTgtNGFiNi05OGVmLTExYmUwMTc2ZjVkOS5qcGciLCJoZWlnaHQiOiI8PTgwMCIsIndpZHRoIjoiPD02MDAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uud2F0ZXJtYXJrIl0sIndtayI6eyJwYXRoIjoiXC93bVwvMmM0YmNhYTUtMGQ5Yi00MzQyLWIyODctNmQyZDUwYWI1ODg0XC9zdXRpamEtNC5wbmciLCJvcGFjaXR5Ijo5NSwicHJvcG9ydGlvbnMiOjAuNDUsImdyYXZpdHkiOiJjZW50ZXIifX0.3v6BAP1tXo4BsIVTli-OUFDzODz2HJIX67rVtecxIjE"
                                />
                                <cite className="cite">Dražen Petrović (Author: Marko Šutija)</cite>
                            </div>
                        </Column>
                        <Column size={{sm: 2, md: 3, lg: 3}}>
                            <div className="image-wrapper">
                                <img
                                    alt="Dražen Petrović"
                                    className="image"
                                    src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2c4bcaa5-0d9b-4342-b287-6d2d50ab5884/d6xi2js-50357cf7-cf3d-4de7-9657-18d3c17ff443.jpg/v1/fill/w_800,h_583,q_75,strp/western_by_sutija_d6xi2js-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvMmM0YmNhYTUtMGQ5Yi00MzQyLWIyODctNmQyZDUwYWI1ODg0XC9kNnhpMmpzLTUwMzU3Y2Y3LWNmM2QtNGRlNy05NjU3LTE4ZDNjMTdmZjQ0My5qcGciLCJoZWlnaHQiOiI8PTU4MyIsIndpZHRoIjoiPD04MDAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uud2F0ZXJtYXJrIl0sIndtayI6eyJwYXRoIjoiXC93bVwvMmM0YmNhYTUtMGQ5Yi00MzQyLWIyODctNmQyZDUwYWI1ODg0XC9zdXRpamEtNC5wbmciLCJvcGFjaXR5Ijo5NSwicHJvcG9ydGlvbnMiOjAuNDUsImdyYXZpdHkiOiJjZW50ZXIifX0.wCZ--sTcp9KHS0p8nIH_5PcVxivu60eEews6_9DZabo"
                                />
                                <cite className="cite">Rider (Author: Marko Šutija)</cite>
                            </div>
                        </Column>
                    </Grid>
                </Column>
                {breakpoint !== 'sm' && <Column size={{md: 2, lg: 6}}>
                    <div className="centered">
                        Hello from the right side.
                    </div>
                </Column>}
            </Grid>
        </section>
    </div>;
}

export default App
