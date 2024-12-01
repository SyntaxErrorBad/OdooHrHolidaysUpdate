Module for Detailed Vacation Requests Display
=============================================

This module allows you to display all vacation requests in various statuses, providing a three-level detail for better vacation management. The user can choose between a custom and a basic view via a dropdown list.

Features
--------

1. **Displaying all vacation requests:**
   - The module shows not only approved vacations but also vacations in other statuses (e.g., pending, rejected).

2. **Three-level detail:**
   - **Department:** The first level displays the department to which the request belongs.
   - **Vacation Type:** The second level shows the type of vacation (e.g., annual leave, unpaid leave, etc.).
   - **Request:** The third level displays the specific request, showing the vacation period, number of days, and request status.

3. **Request status at the deepest level:**
   - In the deepest rows (for each request), not only the period and number of days are shown, but also the request status (e.g., "approved", "pending", "rejected").

4. **View options:**
   - The user can choose between two view options:
     - **Basic view:** A standard display of vacation requests.
     - **All departments view:** A custom display based on specific criteria.

How to Use
----------

1. In the vacation view form, there is a dropdown list where you can choose the desired view type.
2. After selecting an option, the list of vacation requests will be displayed according to the chosen type.
3. For each request, its department, vacation type, period, number of days, and status will be shown.

Technical Requirements
----------------------

- Odoo 17
- Basic vacation management configuration (this will be installed automatically during module installation).

Installation
------------

1. Download the module to the `addons` directory of your Odoo installation.
2. Activate the module through the "Apps" menu.
3. Use the dropdown list to select the vacation request view type.
