// $.getJSON(data_link, 
//  function(data) {show_default(data)});

data = [
  {
    "num_closed": [
      9,
      21,
      28,
      31
    ],
    "num_closed_0_comments": [
      0,
      2,
      0,
      2
    ],
    "median_close_time": [
      1,
      1,
      0,
      0
    ],
    "avg_close_time": [
      3,
      3,
      2.9,
      5.7
    ],
    "num_open": [
      15,
      22,
      23,
      22
    ],
    "num_unique_authors": [
      13,
      20,
      22,
      6
    ],
    "unique_authors": [
      "sophieball",
      "sophieball",
      "sophieball",
      "sophieball",
      "sophieball",
      "sophieball",
    ],
    "new_authors": [
      "sophieball",
      "sophieball",
      "sophieball",
      "sophieball",
      "sophieball",
    ],
    "num_new_authors": [
      8,
      16,
      18,
      5
    ],
    "recur_authors": [
      "A-Lamia",
      "fprasx",
      "artfulrobot",
      "CaptainJack42",
      "Stianhn",
      "Eloitor"
    ],
    "num_recur_authors": [
      5,
      4,
      4,
      6
    ],
    "avg_tenure": [
      1.2846153846153847,
      1.107936507936508,
      0.7106060606060606,
      0.30952380952380953
    ],
    "median_comments_before_close": [
      1,
      2,
      3,
      2
    ],
    "avg_comments_before_close": [
      2.9,
      2.6,
      5.8,
      3.6
    ],
    "median_comments_recent": [
      3,
      2.5,
      2,
      2
    ],
    "avg_comments_recent": [
      4.3,
      4.1,
      4.2,
      3.5
    ],
    "num_toxic": [
      0,
      0,
      0,
      0
    ],
    "toxic": [
      [],
      [],
      [],
      []
    ],
    "max_toxic": [
      0.317,
      0.351,
      0.23,
      0.149
    ],
    "max_attack": [
      0.206,
      0.221,
      0.333,
      0.408
    ],
    "label_counts_keys": [
      "question",
      "bug",
      "enhancement",
      "upstream",
      "unsupported",
      "duplicate"
    ],
    "label_counts_values": [
      70,
      24,
      16,
      7,
      5,
      4
    ],
    "long_standing": [
      {
        "title": "Long-standing",
        "url": "https://github.com/"
      },
      {
        "title": "Long-standing",
        "url": "https://github.com/"
      }
    ],
    "most_comments": [
      {
        "title": "Long conversation",
        "url": "https://github.com/"
      },
      {
        "title": "Long conversation",
        "url": "https://github.com/"
      }
    ]
  },
  {
    "num_closed": [
      3,
      6,
      16,
      14
    ],
    "num_closed_0_comments": [
      0,
      1,
      1,
      1
    ],
    "median_close_time": [
      0,
      3.5,
      0,
      0
    ],
    "avg_close_time": [
      0.7,
      4.8,
      0.9,
      0.3
    ],
    "num_open": [
      6,
      5,
      15,
      14
    ],
    "num_unique_authors": [
      4,
      3,
      5,
      6
    ],
    "unique_authors": [
      "sophieball",
      "sophieball",
      "sophieball",
      "sophieball",
      "sophieball",
      "sophieball"
    ],
    "new_authors": [
      "sophieball",
      "sophieball",
      "sophieball",
      "sophieball"
    ],
    "num_new_authors": [
      2,
      1,
      1,
      4
    ],
    "recur_authors": [
      "sophieball",
      "sophieball"
    ],
    "num_recur_authors": [
      2,
      2,
      4,
      2
    ],
    "avg_tenure": [
      3.9966666666666666,
      3.8238095238095235,
      3.596296296296296,
      2.928205128205128
    ],
    "median_comments_before_close": [
      3,
      2,
      1,
      1
    ],
    "avg_comments_before_close": [
      3,
      4.5,
      2.1,
      1.5
    ],
    "median_comments_recent": [
      3,
      1,
      1,
      1
    ],
    "avg_comments_recent": [
      5.7,
      2,
      1.5,
      1.4
    ],
    "num_toxic": [
      0,
      0,
      1,
      0
    ],
    "toxic": [
      [],
      [],
      [
      {
        "title": "Toxic",
        "url": "https://github.com/"
      }
      ],
      []
    ],
    "max_toxic": [
      0.159,
      0.133,
      0.743,
      0.094
    ],
    "max_attack": [
      0.223,
      0.155,
      0.084,
      0.105
    ],
    "label_counts_keys": [
      "enhancement",
      "bug",
      "cleanup",
      "documentation"
    ],
    "label_counts_values": [
      14,
      8,
      7,
      4
    ],
    "long_standing": [
      {
        "title": "Long-standing",
        "url": "https://github.com/"
      },
      {
        "title": "Long-standing",
        "url": "https://github.com/"
      }
    ],
    "most_comments": [
      {
        "title": "Long conversation",
        "url": "https://github.com/"
      },
      {
        "title": "Long conversation",
        "url": ""
      }
    ]
  },
  {
    "num_active_authors": [
      17,
      20,
      14,
      1,
      2,
      5
    ],
    "num_issue_closed": [
      9,
      10,
      17,
      0,
      0,
      0
    ],
    "num_pr_closed": [
      3,
      4,
      4,
      0,
      0,
      2
    ],
    "avg_time_issue": [
      3,
      1,
      1,
      0,
      0,
      0
    ],
    "avg_time_pr": [
      0.7,
      0,
      0,
      0,
      0,
      2
    ]
  }
];
show_default(data);

// reads data
// plots the charts that are shown when the page is load
function show_default(data){
    console.log(slug);
    document.getElementById('proj_name').innerHTML += slug;
    // display basic stats
    var top_new_issue_authors = document.getElementById('top_new_issue_authors');
    var top_new_issue_icon = document.getElementById('basic_new_issue');
    top_new_issue_authors.innerHTML = data[0]["num_new_authors"][last_win];
    if (data[0]["num_new_authors"][last_win] > 0){
        top_new_issue_authors.innerHTML += '<span class="small text-gray-600">&nbsp;&nbsp;Team is growing!</span>';
        top_new_issue_icon.classList.add("fa-user-friends");
    }
    else {
        top_new_issue_authors.innerHTML += '<span class="small text-gray-600">&nbsp;&nbsp;So lonely...</span>';
        top_new_issue_icon.classList.add("fa-user");
        // top_new_issue_icon.classList.remove("blue");
    }

    var top_new_pr_authors = document.getElementById('top_new_pr_authors');
    var top_new_pr_icon = document.getElementById('basic_new_pr');
    top_new_pr_authors.innerHTML = data[1]["num_new_authors"][last_win];
    if (data[1]["num_new_authors"][last_win] > 0){
        top_new_pr_authors.innerHTML += '<span class="small text-gray-600">&nbsp;&nbsp;Team is growing!</span>';
        top_new_pr_icon.classList.add("fa-user-friends");
    }
    else {
        top_new_pr_authors.innerHTML += '<span class="small text-gray-600">&nbsp;&nbsp;So lonely...</span>';
        top_new_pr_icon.classList.add("fa-user");
        // top_new_pr_icon.classList.remove("blue");
    }

    // bonding social capital
    var bonding = document.getElementById('bonding');
    var bonding_icon = document.getElementById('bonding_icon');
    bonding.innerHTML = Math.round(data[1]["avg_tenure"][last_win]);
    bonding_icon.classList.add("fa-link");
    if (data[1]["avg_tenure"][last_win] > 3){
        bonding.innerHTML += '<span class="small text-gray-600">&nbsp;&nbsp;An experienced team</span>';
    }
    else {
        bonding.innerHTML += "";
        // bonding_icon.classList.remove("blue"); // display grey
    }

    var old_friends = document.getElementById('old_friends');
    var old_friends_icon = document.getElementById('old_friends_icon');
    num_recur_authors = data[0]["num_recur_authors"][last_win] + data[1]["num_recur_authors"][last_win];
    old_friends.innerHTML = num_recur_authors
    old_friends_icon.classList.add("fa-link");
    if (num_recur_authors > 3) {
        old_friends.innerHTML += '<span class="small text-gray-600">&nbsp;&nbsp;Friends around :-D</span>';    
    }
    else {
        old_friends.innerHTML += "";
        // old_friends_icon.classList.remove("blue"); // display grey
    }

    // activity
    var i_avg_comments_top = document.getElementById('i_avg_comments_top');
    var i_avg_closed_time_top_icon = document.getElementById('i_avg_comments_top_icon');
    var i_avg_comments_before_close = data[0]["avg_comments_before_close"][last_win];  

    i_avg_comments_top.innerHTML = i_avg_comments_before_close;
    if (i_avg_comments_before_close > 3 & i_avg_comments_before_close < 15) {
        i_avg_comments_top.innerHTML += '<span class="small text-gray-600">&nbsp;&nbsp;Vivid discussion</span>';
        i_avg_closed_time_top_icon.classList.add("fa-comments");
    }
    else if (i_avg_comments_before_close > 15) {
        i_avg_comments_top.innerHTML += '<span class="small text-gray-600">&nbsp;&nbsp;Heated discussions!</span>';
        i_avg_closed_time_top_icon.classList.add("fa-comments");
        i_avg_closed_time_top_icon.classList.remove("blue");
        i_avg_closed_time_top_icon.classList.add("text-danger");
    }
    else {
        i_avg_closed_time_top_icon.classList.add("fa-comment-alt");
        // i_avg_closed_time_top_icon.classList.remove("blue"); // display grey
    }

    var p_avg_comments_top = document.getElementById('p_avg_comments_top');
    var p_avg_closed_time_top_icon = document.getElementById('p_avg_comments_top_icon');
    var p_avg_comments_before_close = data[1]["avg_comments_before_close"][last_win];  

    p_avg_comments_top.innerHTML = p_avg_comments_before_close;
    if (p_avg_comments_before_close > 3 & p_avg_comments_before_close < 15) {
        p_avg_comments_top.innerHTML += '<span class="small text-gray-600">&nbsp;&nbsp;Vivid discussion</span>';
        p_avg_closed_time_top_icon.classList.add("fa-comments");
    }
    else if (p_avg_comments_before_close > 15) {
        p_avg_comments_top.innerHTML += '<span class="small text-gray-600">&nbsp;&nbsp;Heated discussions!</span>';
        p_avg_closed_time_top_icon.classList.add("fa-comments");
        p_avg_closed_time_top_icon.classList.remove("blue");
        p_avg_closed_time_top_icon.classList.add("text-danger");
    }
    else {
        p_avg_closed_time_top_icon.classList.add("fa-comment-alt");
        // p_avg_closed_time_top_icon.classList.remove("blue"); // display grey
    }

    // responsiveness
    var i_avg_closed_time_top = document.getElementById('i_avg_close_top');
    i_avg_closed_time_top.innerHTML = data[0]["avg_close_time"][last_win];

    var pr_avg_closed_time_top = document.getElementById('p_avg_close_top');
    pr_avg_closed_time_top.innerHTML = data[1]["avg_close_time"][last_win];

    // display time consuming issues
    var long_time_convs = document.getElementById('time_consuming_convs');
    long_standings = data[0].long_standing;
    long_time_convs.innerHTML = 'Issues that have been opened for the longest time:<br>';
    long_standings.forEach((long_standing) => {
        long_time_convs.innerHTML += 
            '<p class="mb-2"><a href="'+long_standing.url+'">'+long_standing.title+'</a></p>';
    });

    // display issues with many rounds
    var most_comment_conv = document.getElementById('many_comments_convs');
    most_comments = data[0].most_comments;
    most_comment_conv.innerHTML = 'Open issues with the most comments:<br>';
    most_comments.forEach((most_comment) => {
        most_comment_conv.innerHTML += 
            '<p class="mb-2"><a href="'+most_comment.url+'">'+most_comment.title+'</a></p>';
    });

    // display default charts
    issue_config = Object.assign({}, line_config);
    issue_config["data"] = {
        labels: months,
        datasets: [{
            label: "Number of New Authors",
            backgroundColor: line_colors[0],
            borderColor: line_colors[0],
            fill: false,
            borderWidth: line_width,
            tension: 0,
            pointRadius: point_radius,
            pointHoverRadius: hover_radius,
            data: data[0].num_new_authors,
        }]
    };
    issue_config["options"]["title"]["text"] = "New Issue Authors";
    issue_size_chart = new Chart(document.getElementById("issueSizeChart"), issue_config);

    pr_config = Object.assign({}, line_config);
    pr_config["data"] = {
        labels: months,
        datasets: [{
            label: "Number of New Authors",
            backgroundColor: line_colors[0],
            borderColor: line_colors[0],
            fill: false,
            borderWidth: line_width,
            tension: 0,
            pointRadius: point_radius,
            pointHoverRadius: hover_radius,
            data: data[1].num_new_authors
        }]
    };
    pr_config["options"]["title"]["text"] = "New PR Authors";
    pr_size_chart = new Chart(document.getElementById("prSizeChart"), pr_config);

    issue_label = Object.assign({}, bar_config);
    issue_label["data"] = {
        labels: data[0].label_counts_keys,
        datasets: [{          
            label: "Number of Issues in Each Label",
            backgroundColor: color_palette,
            borderColor: line_palette,
            borderWidth: 1,
            tension: 0,
            pointRadius: point_radius,
            pointHoverRadius: hover_radius,
            data: data[0].label_counts_values
        }]
    };
    issue_label["options"]["title"]["text"] = "Issues by Label in the Past Week";

    // display the list of new authors
    // title = "New Issue Authors";
    people = data[0].new_authors;
    new_member = document.getElementById('new_issue_members_list');
    new_member.innerHTML = '';
    if (people.length > 0){
        people.forEach((person) => {
            new_member.innerHTML += 
                '<a class="m-0" href="http://www.github.com/'+person+'">'+person+'</a><br>';
        });
    }
    pr_people = data[1].new_authors;
    pr_new_member = document.getElementById('new_pr_members_list');
    pr_new_member.innerHTML = '';
    if (pr_people.length > 0){
        pr_people.forEach((person) => {
            pr_new_member.innerHTML += 
                '<a class="m-0" href="http://www.github.com/'+person+'">'+person+'</a><br>';
        });
    }

    // if neither issue nor pr uses labels, make these two tabs short
    if (data[0].label_counts_values.length == 0 
        && data[1].label_counts_values.length == 0){
        label_chart_height = "70px";
    }
    else{
        label_chart_height = "300px";
    }

    // plot issue labels and counts
    var num_labels = data[0].label_counts_values.length;
    var issue_label_field = document.getElementById("issue_label_area");
    if (num_labels == 0){
        issue_label_field.innerHTML = "<div class='chart-area' style='height: "+label_chart_height+" !important;'><p>Seems like you aren't using labels to manage your issues</p></div>"
    }
    else{        
        issue_label_field.innerHTML = "<div class='chart-area' style='height: "+label_chart_height+" !important;'><canvas id='issue_labels'></canvas></div>"
        new Chart(document.getElementById("issue_labels"), issue_label);
    }

    pr_label = Object.assign({}, bar_config);
    pr_label["data"] = {
        labels: data[1].label_counts_keys,
        datasets: [{
            label: "Number of PRs in Each Label",
            backgroundColor: color_palette,
            borderColor: line_palette,
            borderWidth: 1,
            data: data[1].label_counts_values
        }]
    };
    pr_label["options"]["title"]["text"] = "Pull Requests by Label in the Past Week";
    var pr_num_labels = data[1].label_counts_values.length;
    var pr_label_field = document.getElementById("pr_label_area");
    if (pr_num_labels == 0){
        pr_label_field.innerHTML = "<div class='chart-area' style='height: "+label_chart_height+" !important;'><p>Seems like you aren't using labels to manage your pull requests</p></div>"
    }
    else{
        pr_label_field.innerHTML = "<div class='chart-area' style='height: "+label_chart_height+" !important;'><canvas id='PR_labels'></canvas></div>"
        new Chart(document.getElementById("PR_labels"), pr_label);
    }

    issue_time = Object.assign({}, line_config);
    issue_time["data"] = {
        labels: months,
        datasets: [{
            label: "Average Close Time",
            backgroundColor: line_colors[1],
            borderColor: line_colors[1],
            fill: false,
            borderWidth: line_width,
            tension: 0,
            pointRadius: point_radius,
            pointHoverRadius: hover_radius,
            data: data[0].avg_close_time
        }]
    };
    issue_time["options"]["title"]["text"] = "Avg Close Time for Issues (Days)";
    issue_time_chart = new Chart(document.getElementById("issueTimeChart"), issue_time);

    pr_time = Object.assign({}, line_config);
    pr_time["data"] = {
        labels: months,
        datasets: [{
            label: "Average Close Time",
            backgroundColor: line_colors[1],
            borderColor: line_colors[1],
            fill: false,
            borderWidth: line_width,
            tension: 0,
            pointRadius: point_radius,
            pointHoverRadius: hover_radius,
            data: data[1].avg_close_time
        }]
    };
    pr_time["options"]["title"]["text"] = "Avg Close Time for Pull Requests (Days)";
    pr_time_chart = new Chart(document.getElementById("prTimeChart"), pr_time);


    issue_dis = Object.assign({}, line_config);
    issue_dis["data"] = {
        labels: months,
        datasets: [{
            label: "Average Number of Comments",
            backgroundColor: line_colors[1],
            borderColor: line_colors[1],
            fill: false,
            borderWidth: line_width,
            tension: 0,
            pointRadius: point_radius,
            pointHoverRadius: hover_radius,
            data: data[0].avg_comments_before_close
        }]
    };
    issue_dis["options"]["title"]["text"] = "Avg Comments for Issues Closed in Each Week";
    issue_dicussion_chart = new Chart(document.getElementById("issueDisChart"), issue_dis);

    pr_dis = Object.assign({}, line_config);
    pr_dis["data"] = {
        labels: months,
        datasets: [{
            label: "Average Number of Comments",
            backgroundColor: line_colors[1],
            borderColor: line_colors[1],
            fill: false,
            borderWidth: line_width,
            tension: 0,
            pointRadius: point_radius,
            pointHoverRadius: hover_radius,
            data: data[1].avg_comments_before_close
        }]
    };
    pr_dis["options"]["title"]["text"] = "Avg Comments for Pull Requests Closed in Each Week";
    pr_dicussion_chart = new Chart(document.getElementById("prDisChart"), pr_dis);

    // display week date range in the toxicity tab
    num_months = months.length;
    var button_i_6_text = document.getElementById("6_text");
    var button_i_5_text = document.getElementById("5_text");
    var button_i_4_text = document.getElementById("4_text");
    var button_i_3_text = document.getElementById("3_text");
    console.log(button_i_3_text);
    console.log(months[num_months-1]);
    button_i_6_text.innerHTML = months[num_months-1];
    button_i_5_text.innerHTML = months[num_months-2];
    button_i_4_text.innerHTML = months[num_months-3];
    button_i_3_text.innerHTML = months[num_months-4];

    var button_t_6_text = document.getElementById("pr_6_text");
    var button_t_5_text = document.getElementById("pr_5_text");
    var button_t_4_text = document.getElementById("pr_4_text");
    var button_t_3_text = document.getElementById("pr_3_text");
    button_t_6_text.innerHTML = months[num_months-1];
    button_t_5_text.innerHTML = months[num_months-2];
    button_t_4_text.innerHTML = months[num_months-3];
    button_t_3_text.innerHTML = months[num_months-4];

    // toxic issues
    toxic_config = Object.assign({}, line_config);
    toxic_config["data"] = {
        labels: months,
        datasets: [{
            label: "Number of Issues",
            backgroundColor: line_colors[3],
            borderColor: line_colors[3],
            fill: false,
            borderWidth: line_width,
            tension: 0,
            pointRadius: point_radius,
            data: data[0].num_toxic
        }]
    };
    toxic_config["options"]["title"]["text"] = "Number of Potentially Problematic Issues";
    toxic_chart = new Chart(document.getElementById("issue_toxicity_info"), toxic_config);

    var toxic_score = document.getElementById("issue_highest_toxic");
    toxic_score.innerHTML = data[0].max_toxic[data[0].max_toxic.length - 1];
    var attack_score = document.getElementById("issue_highest_attack");
    attack_score.innerHTML = data[0].max_attack[data[0].max_attack.length - 1];

    var toxic_list = document.getElementById("issue_toxic_links");
    toxic_list.innerHTML = "";

    // by default, show the most recent window
    toxic_links = data[0].toxic[last_win];
    var toxic_title = document.getElementById("issue_links_to_toxicity");
    if (toxic_links.length == 0) {
        toxic_title.innerHTML = "No comment has a toxicity score above the threshold (0.7).";
    }
    else {
        var toxic_count = 1;
        toxic_title.innerHTML = "Links to highest potentially problematic comments (threshold: 0.7)";
        toxic_links.forEach((toxic_link) => {
            toxic_list.innerHTML += 
                '<p class="m-0 p-0"><a href="'+toxic_link.url+'">'+String(toxic_count)+". "+toxic_link.title+'</a></p>';
            toxic_count = toxic_count + 1;
        });
    }

    // toxic prs
    pr_toxic_config = Object.assign({}, line_config);
    pr_toxic_config["data"] = {
        labels: months,
        datasets: [{
            label: "Number of PRs",
            backgroundColor: line_colors[3],
            borderColor: line_colors[3],
            fill: false,
            borderWidth: line_width,
            tension: 0,
            pointRadius: point_radius,
            data: data[1].num_toxic
        }]
    };
    pr_toxic_config["options"]["title"]["text"] = "Number of Potentially Problematic PRs";
    pr_toxic_chart = new Chart(document.getElementById("pr_toxicity_info"), pr_toxic_config);

    var pr_toxic_score = document.getElementById("pr_highest_toxic");
    pr_toxic_score.innerHTML = data[1].max_toxic[data[1].max_toxic.length - 1];
    var pr_attack_score = document.getElementById("pr_highest_attack");
    pr_attack_score.innerHTML = data[1].max_attack[data[1].max_attack.length - 1];

    var pr_toxic_list = document.getElementById("pr_toxic_links");
    pr_toxic_list.innerHTML = "";

    // by default, show the most recent window
    pr_toxic_links = data[1].toxic[last_win];
    var pr_toxic_title = document.getElementById("pr_links_to_toxicity");
    if (pr_toxic_links.length == 0) {
        pr_toxic_title.innerHTML = "No comment has a toxicity score above the threshold (0.7).";
    }
    else {
        var pr_toxic_count = 1;
        pr_toxic_title.innerHTML = "Links to highest potentially problematic comments (threshold: 0.7)";
        pr_toxic_links.forEach((toxic_link) => {
            pr_toxic_list.innerHTML += 
                '<p class="m-0 p-0"><a href="'+pr_toxic_link.url+'">'+String(pr_toxic_count)+". "+pr_toxic_link.title+'</a></p>';
            pr_toxic_count = pr_toxic_count + 1;
        });
    }

    // plot the comparison chart
    compare_config_d = Object.assign({}, bar_config);
    compare_config_d["data"] = {
            labels: compare_title,
            datasets: [{
                label: "",
                data: data[2].num_active_authors,
                backgroundColor: color_palette,
                borderColor: line_palette,
                borderWidth: 1
            }]
        };
    compare_config_d["options"]["title"]["text"] = "Active Authors (Issues and Pull Requests)";
    compareChart = new Chart(comp, compare_config_d);

    // display the list of projects to be compared with
    comp_list = document.getElementById('project_list');
    comp_list.innerHTML = "";
    for (let i = 1; i < projects_for_comparison.length; i++) {
      comp_list.innerHTML += 'proj'+i+': <a href="http://github.com/'+projects_for_comparison[i]+'">'+projects_for_comparison[i]+'</a><br>';
    }

    // set tip tab height
    var finding_tab = document.getElementById("finding_area");
    finding_tab_height = finding_tab.clientHeight;
    var tips_area = document.getElementById("tips_area");
    tips_area.style.clientHeight = finding_tab_height;

    // print new contributors' logins
    createGraphs(data);

    listConvers(data);

    displayToxic(data);
}; 
