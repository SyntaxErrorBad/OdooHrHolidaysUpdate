/* @odoo-module */

import { registry } from "@web/core/registry";
import { useService } from "@web/core/utils/hooks";
import { useRecordObserver } from "@web/model/relational_model/utils";

import { formatDate } from "@web/core/l10n/dates";
import { Component, useState, onWillStart } from "@odoo/owl";
import { LeaveStatsComponent } from "@hr_holidays/leave_stats/leave_stats"

const { DateTime } = luxon;

export class LeaveDetailStatsComponent extends LeaveStatsComponent {
    setup() {
        this.orm = useService("orm");

        super.setup()

        this.state = useState({
            leaves: [],
            departmentLeaves: [],
            viewType: "all_departments",
            alldepartmentLeaves: [],
        });

        onWillStart(async () => {
            await this.loadAllDepartmentLeaves();
        });
    }

    onLeaveTypeChange(event) {
        this.state.viewType = event.target.value;
    }

    async loadAllDepartmentLeaves() {
        const leaves = await this.orm.searchRead(
            "hr.leave",
            [],
            ["department_id", "employee_id", "date_from", "date_to", "number_of_days", "holiday_status_id", "state"]
        );

        const departmentsWithLeaves = [...new Set(leaves.map(leave => leave.department_id[0]))];

        const departments = await this.orm.searchRead("hr.department", [
            ["id", "in", departmentsWithLeaves]
        ], ["name", "id"]);

        let departmentLeavesStructure = [];

        for (let dept of departments) {

            const departmentLeaves = leaves.filter(leave => leave.department_id[0] === dept.id);

            let departmentData = {
                departmentName: dept.name,
                leaveTypes: []
            };

            const leaveTypes = departmentLeaves.reduce((acc, leave) => {
                const leaveType = leave.holiday_status_id[1];

                if (!acc[leaveType]) {
                    acc[leaveType] = [];
                }

                acc[leaveType].push({
                    employeeId: leave.employee_id[0],
                    // Если нет имени сотрудника, ставим "No Employee"
                    employeeName: leave.employee_id[1] || "No Employee",
                    dateFrom: formatDate(DateTime.fromSQL(leave.date_from, { zone: "utc" }).toLocal()),
                    dateTo: formatDate(DateTime.fromSQL(leave.date_to, { zone: "utc" }).toLocal()),
                    numberOfDays: leave.number_of_days,
                    status: leave.state,
                });

                return acc;
            }, {});

            departmentData.leaveTypes = Object.keys(leaveTypes).map(leaveType => ({
                leaveTypeName: leaveType,
                employees: leaveTypes[leaveType],
            }));

            departmentLeavesStructure.push(departmentData);
        }

        this.state.alldepartmentLeaves = departmentLeavesStructure;
    }

}

LeaveDetailStatsComponent.template = "detail_hr_leave.LeaveDetailStatsComponent";

export const leaveDetailStatsComponent = {
    component: LeaveDetailStatsComponent,
};
registry.category("view_widgets").add("hr_leave_detail_stats", leaveDetailStatsComponent);
