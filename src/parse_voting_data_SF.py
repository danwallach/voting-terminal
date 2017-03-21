import sys
import re
for file_name in sys.argv:
    # Loops through all files in arguments

    # Defining dictionaries that translate un-parsed into parsed
    candidates_dict = {
        "0": "Obama   ",
        "1": "WBush   ",
     "2": "Clinton ",
     "3": "H.W.Bush",
     "4": "Reagan  ",
     "5": "Carter  "}
    table_dict = {"0": "Table 1", "1": "Table 2", "2": "Table 3"}
    researcher_dict = {
        "Kortum": "Dr. Kortum",
        "Claudia": "Dr. Acemyan",
     "SF": "San Francisco Style"}

    # This may be unnecessary, I'm too scared to delete it
    begin_time = 1

    # The python file itself is passed as an argument.
    # This is a very strict way of ensuring only data files are parsed
    if re.match(r"[a-zA-Z]+\d+\.txt", file_name):

        # Opens file and reads data into a string
        file = open(file_name, "r")
        unparsed_string = file.readlines()[0]

        # Cuts down string, creates an array of each click event
        unparsed_string = unparsed_string[2:-2]
        click_array = re.split(r"\],\[", unparsed_string)

        # Grabs the subject number and researcher ID
        subject_number = re.findall(r"\d+", file_name)[0]
        researcher_name = re.findall(r"^([a-zA-Z]+)\d", file_name)[0]

        # Writes researcher name to file
        output_file = open("subject" + subject_number + ".txt", "w")
        output_file.write(researcher_dict[researcher_name])
        output_file.write("\n")

        # This may be unnecessary, I'm too scared to delete it
        previous_event = 0

        # Iterates through click events, adds to the file for all events
        for click_event in click_array:

            # Splits each click event into info bits
            click_event_array = re.split(",", click_event)

            # first_item determines what kind of click event occured
            first_item = click_event_array[0]

            # Calculates time relative to beginning of experiment
            time_passed = int(click_event_array[-1]) - int(begin_time)
            time_passed /= 1000.0  # milliseconds

            # Calculates time relative to previous click event
            previous_event = time_passed - previous_event

            # Writes to file based on type of click event
            if(first_item == "\"Begin\""):
                # Resets time variables
                begin_time = click_event_array[1]
                time_passed = 0
            elif(first_item == "\"Previous\""):
                output_file.write("Previous         at " + str(time_passed)[
                    :5].ljust(5) + " seconds, delta " + str(previous_event))
                output_file.write("\n")
            elif(first_item == "\"Next\""):
                output_file.write("Next             at " + str(
                    time_passed)[:5].ljust(5) + " seconds, delta " + str(previous_event))
                output_file.write("\n")
            elif(first_item == "\"End\""):
                output_file.write("End              at " + str(
                    time_passed)[:5].ljust(5) + " seconds, delta " + str(previous_event))
                output_file.write("\n")
            else:
                output_file.write(table_dict[first_item] + " " + candidates_dict[
                    click_event_array[1]] + " at " + str(time_passed)[:5].ljust(5) + " seconds, delta " + str(previous_event)[:5].ljust(5))
                output_file.write("\n")

            # Defines previous event for next click event's usage
            previous_event = time_passed
        output_file.close()
