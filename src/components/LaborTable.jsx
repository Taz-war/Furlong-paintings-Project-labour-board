import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { CircularProgress, Grid } from "@mui/material";
import { Box } from "@mui/system";

const CustomTabelCell = ({ status, data, i, n }) => (
	<TableCell
		size="small"
		sx={{
			zIndex: 0,
			position: "sticky",
			left: `${
				i === 0
					? "0px"
					: i === 1
					? "233px"
					: i === 2
					? "466px"
					: i === 3
					? "584px"
					: i === 4
					? "702px"
					: i === 5
					? "820px"
					: i === 6
					? "938px"
					: null
			}`,

			borderLeft: "1px solid black",
			outline: "1px solid black",
			outlineOffset: "-0.5px",
			backgroundColor: `${
				status === "In Progress"
					? "#4CAF50"
					: status === "Completed"
					? "yellow"
					: status === "Rectification"
					? "red"
					: "white"
			}`,
			color: `${
				status === "In Progress"
					? "white"
					: status === "Completed"
					? "black"
					: status === "Rectification"
					? "white"
					: "black"
			}`,
			textAlign: "center",
			fontSize: "12px",
			whiteSpace: "nowrap",
			// overflow: "hidden",
			// textOverflow: "ellipsis",
			width: "auto",
			tableLayout: "auto",
		}}
	>
		<p
			title={i === 0 || i === 1 ? data : null}
			style={{
				textOverflow: "ellipsis",
				overflow: "hidden",
				width: `${i === 0 || i === 1 ? "200px" : "85px"}`,
			}}
		>
			{data}
		</p>
		{/* {data} */}
	</TableCell>
);

const CustomTabelCells = ({ status, data, i, n }) => (
	<TableCell
		size="small"
		sx={{
			zIndex: -2,
			position: "sticky",
			left: `${
				i === 0
					? "0px"
					: i === 1
					? "233px"
					: i === 2
					? "466px"
					: i === 3
					? "584px"
					: i === 4
					? "702px"
					: i === 5
					? "820px"
					: i === 6
					? "938px"
					: null
			}`,

			borderLeft: "1px solid black",
			backgroundColor: `${
				status === "In Progress"
					? "#4CAF50"
					: status === "Completed"
					? "yellow"
					: status === "Rectification"
					? "red"
					: "white"
			}`,
			color: `${
				status === "In Progress"
					? "white"
					: status === "Completed"
					? "black"
					: status === "Rectification"
					? "white"
					: "black"
			}`,
			textAlign: "center",
			fontSize: "12px",
			// whiteSpace: "nowrap",
			// overflow: "hidden",
			// textOverflow: "ellipsis",
			width: "auto",
			tableLayout: "auto",
		}}
	>
		{/* <p
			title={i === 0 || i === 1 ? data : null}
			style={{
				textOverflow: "ellipsis",
				overflow: "hidden",
				width: `${i === 0 || i === 1 ? "200px" : "85px"}`,
			}}
		> */}
		{data}
		{/* </p> */}
		{/* {data} */}
	</TableCell>
);

const textRotateStyle = {
	transform: "rotate(-45deg)",
	transformOrigin: "50% 50%",
	WebkitTransform: "rotate(-45deg)",
	WebkitTransformOrigin: "50% 50%",
	MozTransform: "rotate(45deg)",
	MozTransformOrigin: "50% 50%",
	msTransform: "rotate(-45deg)",
	msTransformOrigin: "50% 50%",
	OTransform: "rotate(-45deg)",
	OTransformOrigin: "50% 50%",
};

export default function LaborTable({ laborData }) {
	const [sorting, setSorting] = React.useState("All");
	const rowData = [];

	if (laborData.length === 0) {
		return (
			<Box
				sx={{
					height: "100vh",
					width: "100%",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<CircularProgress size={70} />
			</Box>
		);
	}

	const PaintersNeeded = [
		"Donny",
		"Troy",
		"Christine",
		"William",
		"John",
		"Farhad",
		"Michael",
		"Muhammad",
		"Keith",
		"Joban",
		"Andy",
		"Daniel",
	];

	laborData.forEach((row) => {
		const labours = JSON.parse(row.labor_board_contractors_data);

		const outsider = [];

		const track = [];

		const insider = [];

		PaintersNeeded.map((name, index) => {
			labours.map((item) => {
				if (item.Contractor_First_Name === name) {
					insider.push(item);
				} else {
					if (
						PaintersNeeded.includes(item.Contractor_First_Name) === false &&
						track.includes(item.Contractor_First_Name) !== true
					) {
						track.push(item.Contractor_First_Name);
						outsider.push(item);
					}
				}
			});
		});
		const finalArray = insider.concat(outsider);

		rowData.push({
			Client: row.Client,
			Name: row.Name,
			summary: row.Project_Summary,
			office_budget: row.office_budget,
			asses: row.asses,
			wip: row.wip,
			labor_board_contractors_data: finalArray,
			status: row.Project_Status,
		});
	});

	return (
		<TableContainer
			sx={{
				width: "100%",
				height: "100vh",
				border: "1px solid black",
			}}
		>
			<Table aria-label="simple table" size="small">
				<TableHead>
					<TableRow
						style={{
							position: "sticky",
							left: 0,
							zIndex: 2,
							top: 0,
							backgroundColor: "#fff",
							// borderBottom: "1px solid black",
						}}
					>
						<TableCell
							colSpan="4"
							sx={{
								zIndex: 2,
								position: "sticky",
								left: "0px",
								backgroundColor: "#3f51b5",
								textAlign: "center",
								fontWeight: "bold",
								fontSize: "25px",
								color: "#fff",
								padding: "50px 0px",
								outline: "1px solid black",
								outlineOffset: "-0.5px",
							}}
						>
							Project Labour Board
						</TableCell>
						<TableCell
							sx={{
								zIndex: 2,
								left: "702px",
								position: "sticky",
								// borderLeft: "1px solid black",
								outline: "1px solid black",
								outlineOffset: "-0.5px",
								backgroundColor: "#3f51b5",
							}}
						/>
						{["Painters", "Status"].map((title, index) => (
							<TableCell
								key={index}
								sx={{
									zIndex: 2,
									left: `${
										index === 0 ? "820px" : index === 1 ? "938px" : null
									}`,
									position: "sticky",
									// borderLeft: "1px solid black",
									outline: "1px solid black",
									outlineOffset: "-0.5px",
									backgroundColor: "#3f51b5",
									color: "#fff",
								}}
							>
								{title}
								{title === "Status" && (
									<select onChange={(e) => setSorting(e.target.value)}>
										<option>All</option>
										<option>Requested</option>
										<option>In Progress</option>
										<option>Rectification</option>
										<option>Completed</option>
									</select>
								)}
							</TableCell>
						))}

						{rowData[0].labor_board_contractors_data?.map((painter, index) => (
							<TableCell
								colSpan="2"
								sx={{
									// position:"relative",
									zIndex: 1,
									// borderLeft: "1px solid black",
									outline: "1px solid black",
									outlineOffset: "-0.5px",
									textAlign: "center",
									backgroundColor: "#3f51b5",
									color: "#fff",
								}}
								key={index}
							>
								<p style={textRotateStyle}>{painter.Contractor_First_Name}</p>
							</TableCell>
						))}
					</TableRow>
					<TableRow
						sx={{
							position: "sticky",
							left: 0,
							zIndex: 1,
							top: 120,
							backgroundColor: "#fff",
							borderBottom: "1px solid black",
						}}
					>
						{[
							"Project",
							"Project summary",
							"Office Budget",
							"Asseses",
							"WIP",
							"To Compelte",
							"",
						].map((label, index) => (
							<TableCell
								key={index}
								sx={{
									position: "sticky",
									zIndex: 2,
									left: `${
										index === 0
											? "0px"
											: index === 1
											? "233px"
											: index === 2
											? "466px"
											: index === 3
											? "584px"
											: index === 4
											? "702px"
											: index === 5
											? "820px"
											: index === 6
											? "938px"
											: null
									}`,
									borderLeft: "1px solid black",
									outline: "1px solid black",
									outlineOffset: "-0.5px",
									backgroundColor: "#ECEEF8",
									fontWeight: index === 6 ? 600 : "normal",
									writingMode: index === 6 ? "vertical-rl" : "horizontal-tb",
									textOrientation: index === 6 ? "mixed" : "sideways",
									color: index === 6 ? "#4CAF50" : "inherit",
								}}
							>
								{label}
							</TableCell>
						))}
						{rowData[0].labor_board_contractors_data?.map((painter) => (
							<>
								<TableCell
									sx={{
										zIndex: 1,
										textAlign: "center",
										borderLeft: "1px solid black",
										outline: "1px solid black",
										outlineOffset: "-0.5px",
										fontWeight: 600,
										backgroundColor: "#ECEEF8",
									}}
								>
									<p style={textRotateStyle}>Past</p>
								</TableCell>
								<TableCell
									sx={{
										zIndex: 1,
										textAlign: "center",
										borderLeft: "1px solid black",
										outline: "1px solid black",
										outlineOffset: "-0.5px",
										fontWeight: 600,
										backgroundColor: "#ECEEF8",
										color: "#4CAF50",
									}}
								>
									<p style={textRotateStyle}>Due</p>
								</TableCell>
							</>
						))}
					</TableRow>
				</TableHead>

				<TableBody>
					{rowData
						.filter((row) => sorting === "All" || row.status === sorting)
						.map((row, id) => (
							<TableRow key={id}>
								{[
									row.Name,
									row.summary,
									row.office_budget,
									row.asses,
									row.wip,
									"",
									row.status,
								].map((data, index) => (
									<CustomTabelCell
										i={index}
										key={index}
										status={row.status}
										data={data}
									/>
								))}
								{row.labor_board_contractors_data.map((item, index) => (
									<React.Fragment key={index}>
										<CustomTabelCells
											status={row.status}
											data={
												item.Total_Invoiced !== 0 ? item.Total_Invoiced : ""
											}
										/>
										<CustomTabelCells
											status={row.status}
											data={
												item.This_Week_Invoiced_Hour !== 0
													? item.This_Week_Invoiced_Hour
													: ""
											}
										/>
									</React.Fragment>
								))}
							</TableRow>
						))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
