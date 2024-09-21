export default function DataFields() {
    return (
        <>
            <table className="table table-dark table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">Field</th>
                        <th scope="col">Type</th>
                        <th scope="col">Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>name</strong></td>
                        <td>String</td>
                        <td>The full name of the football player.</td>
                    </tr>
                    <tr>
                        <td><strong>nationality</strong></td>
                        <td>String</td>
                        <td>The nationality of the player.</td>
                    </tr>
                    <tr>
                        <td><strong>age</strong></td>
                        <td>Number</td>
                        <td>The current age of the player.</td>
                    </tr>
                    <tr>
                        <td><strong>position</strong></td>
                        <td>String</td>
                        <td>The player's position on the field (e.g., Forward, Midfielder, Defender).</td>
                    </tr>
                    <tr>
                        <td><strong>club</strong></td>
                        <td>String</td>
                        <td>The current club the player is playing for.</td>
                    </tr>
                    <tr>
                        <td><strong>goals</strong></td>
                        <td>Number</td>
                        <td>The total number of goals scored by the player across all clubs.</td>
                    </tr>
                    <tr>
                        <td><strong>assists</strong></td>
                        <td>Number</td>
                        <td>The total number of assists provided by the player across all clubs.</td>
                    </tr>
                    <tr>
                        <td><strong>appearances</strong></td>
                        <td>Number</td>
                        <td>The total number of games the player has played across all clubs.</td>
                    </tr>
                    <tr>
                        <td><strong>yellow_cards</strong></td>
                        <td>Number</td>
                        <td>The total number of yellow cards received by the player.</td>
                    </tr>
                    <tr>
                        <td><strong>red_cards</strong></td>
                        <td>Number</td>
                        <td>The total number of red cards received by the player.</td>
                    </tr>
                    <tr>
                        <td><strong>teams</strong></td>
                        <td>Array</td>
                        <td>A list of teams/clubs the player has played for in their career.</td>
                    </tr>
                    <tr>
                        <td><strong>image_url</strong></td>
                        <td>String</td>
                        <td>A URL linking to an image of the player.</td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}